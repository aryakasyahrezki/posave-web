<?php

namespace App\Http\Controllers\Advance\Owner\Employee;

use App\Http\Controllers\Controller;
use App\Mail\EmployeeInvitation;
use App\Models\Advance\Messaging\Conversation;
use App\Models\Advance\Owner\Employee\Employee;
use App\Models\Advance\Owner\Employee\EmployeeAccess;
use App\Models\Auth\Branch;
use App\Models\User;
use App\Models\Auth\UserProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        /** @var User $owner */
        $owner = Auth::user();

        $employees = Employee::where('company_id', $owner->company_id)
            ->with(['branch', 'user'])
            ->when($request->branch && $request->branch !== 'all', function ($query) use ($request) {
                $query->where('branch_id', $request->branch);
            })
            ->paginate(5)
            ->withQueryString();

        $branches = Branch::where('company_id', $owner->company_id)->get(['id', 'name']);

        return Inertia::render('advance/owner/employee/employee-list', [
            'employees' => $employees,
            'branches'  => $branches,
            'filters'   => $request->only('branch'),
        ]);
    }

    public function create()
    {
        /** @var User $owner */
        $owner   = Auth::user();
        $roles   = EmployeeAccess::pluck('name');
        $branches = Branch::where('company_id', $owner->company_id)->get(['id', 'name']);

        return Inertia::render('advance/owner/employee/employee-create', [
            'roles'    => $roles,
            'branches' => $branches,
        ]);
    }

    public function store(Request $request)
    {
        /** @var User $owner */
        $owner = Auth::user();

        $request->validate([
            'name'        => 'required|string|max:255',
            'email'       => 'required|email|unique:users,email',
            'role'        => 'required|string|max:255',
            'branch_id'   => 'required|exists:branches,id',
            'active_date' => 'required|date',
            'slot_status' => 'required|string',
        ]);

        // Pastikan branch milik company owner
        $branch = Branch::where('id', $request->branch_id)
            ->where('company_id', $owner->company_id)
            ->firstOrFail();

        // Generate password sementara
        $temporaryPassword = Str::random(10);

        // Bikin akun user
        $user = User::create([
            'name'       => $request->name,
            'email'      => $request->email,
            'password'   => Hash::make($temporaryPassword),
            'company_id' => $owner->company_id,
            'branch_id'  => $branch->id,
            'role'       => $request->role,
        ]);

        // Bikin user profile kosong
        UserProfile::create(['user_id' => $user->id]);

        // Bikin data employee
        $employee = Employee::create([
            'user_id'     => $user->id,
            'company_id'  => $owner->company_id,
            'branch_id'   => $branch->id,
            'name'        => $request->name,
            'role'        => $request->role,
            'active_date' => $request->active_date,
            'slot_status' => $request->slot_status,
        ]);

        // Auto-join group chat branch
        $branchConversation = Conversation::where('branch_id', $branch->id)
            ->where('type', 'group')
            ->first();

        if ($branchConversation) {
            $branchConversation->members()->attach($user->id, ['last_read_at' => now()]);
        }

        // Kirim email undangan
        Mail::to($user->email)->send(
            new EmployeeInvitation($user, $temporaryPassword, $owner->company->profile)
        );

        return redirect()->route('dashboard.employees.index')
            ->with('success', 'Karyawan berhasil ditambahkan dan undangan telah dikirim.');
    }

    public function update(Request $request, string $id)
    {
        /** @var User $owner */
        $owner    = Auth::user();
        $employee = Employee::where('id', $id)
            ->where('company_id', $owner->company_id)
            ->firstOrFail();

        $request->validate([
            'name'        => 'required|string|max:255',
            'role'        => 'required|string|max:255',
            'branch_id'   => 'required|exists:branches,id',
            'active_date' => 'required|date',
            'slot_status' => 'required|string',
        ]);

        $branch = Branch::where('id', $request->branch_id)
            ->where('company_id', $owner->company_id)
            ->firstOrFail();

        // Update data employee
        $employee->update([
            'branch_id'   => $branch->id,
            'name'        => $request->name,
            'role'        => $request->role,
            'active_date' => $request->active_date,
            'slot_status' => $request->slot_status,
        ]);

        // Update branch_id di user juga kalau branch berubah
        if ($employee->user) {
            $employee->user->update(['branch_id' => $branch->id]);

            // Kalau branch berubah, pindahkan ke group chat branch baru
            if ($employee->branch_id !== $branch->id) {
                // Keluar dari group chat lama
                $oldConversation = Conversation::where('branch_id', $employee->branch_id)
                    ->where('type', 'group')
                    ->first();
                $oldConversation?->members()->detach($employee->user_id);

                // Masuk ke group chat baru
                $newConversation = Conversation::where('branch_id', $branch->id)
                    ->where('type', 'group')
                    ->first();
                $newConversation?->members()->attach($employee->user_id, ['last_read_at' => now()]);
            }
        }

        return redirect()->route('dashboard.employees.index')
            ->with('success', 'Data karyawan berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        /** @var User $owner */
        $owner    = Auth::user();
        $employee = Employee::where('id', $id)
            ->where('company_id', $owner->company_id)
            ->firstOrFail();

        // Hapus akun user juga
        $employee->user?->delete();

        // Employee otomatis terhapus karena user_id nullOnDelete
        // tapi kalau mau eksplisit:
        $employee->delete();

        return redirect()->route('dashboard.employees.index')
            ->with('success', 'Karyawan berhasil dihapus.');
    }
}
