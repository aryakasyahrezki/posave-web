<?php

namespace App\Models\Advance\Owner\Employee;

use Illuminate\Database\Eloquent\Model;

class EmployeeAccess extends Model
{
    //
    protected $fillable = ['name'];

    public function employees()
    {
        return $this->hasMany(Employee::class, 'role', 'name');
    }
}
