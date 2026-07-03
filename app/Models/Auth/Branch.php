<?php

namespace App\Models\Auth;

use App\Models\Advance\Messaging\Conversation;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = ['company_id', 'name', 'address', 'phone', 'is_main', 'status'];

    protected $casts = ['is_main' => 'boolean'];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    // tambah method ini
    public function conversation(): HasOne
    {
        return $this->hasOne(Conversation::class);
    }
}
