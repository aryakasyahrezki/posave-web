<?php

namespace App\Models\Auth;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_id',
        'name',
        'logo',
        'address',
        'province',
        'city',
        'zip',
        'phone',
        'instagram',
        'facebook',
        'x',
        'youtube',
        'whatsapp',
        'website',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}
