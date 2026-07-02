<?php

use App\Http\Controllers\Advance\Owner\Settings\SettingsController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('settings')->name('settings.')->group(function () {
    Route::redirect('settings', '/profile');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');
});

// Receipt — semua mode (lite & advance), owner only
Route::middleware(['auth', 'onboarded', 'role:owner'])->group(function () {
    Route::get('/settings/receipt', [SettingsController::class, 'receiptSettings'])->name('settings.receipt');
    Route::post('/settings/receipt', [SettingsController::class, 'updateReceiptSettings'])->name('settings.receipt.update');
});

// Company profile & branches — advance mode, owner only
Route::middleware(['auth', 'onboarded', 'advance', 'role:owner'])->group(function () {
    Route::get('/settings/company-profile', [SettingsController::class, 'companyProfile'])->name('settings.company-profile');
    Route::post('/settings/company-profile', [SettingsController::class, 'updateCompanyProfile'])->name('settings.company-profile.update');

    Route::get('/settings/branches', [SettingsController::class, 'branches'])->name('settings.branches');
    Route::post('/settings/branches', [SettingsController::class, 'storeBranch'])->name('settings.branches.store');
    Route::put('/settings/branches/{branch}', [SettingsController::class, 'updateBranch'])->name('settings.branches.update');
    Route::delete('/settings/branches/{branch}', [SettingsController::class, 'destroyBranch'])->name('settings.branches.destroy');
});
