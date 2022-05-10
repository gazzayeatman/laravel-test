<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vehicle extends Model
{
    use HasFactory;

    public function driver(): BelongsTo
    {
        return $this->BelongsTo(User::class, 'driver_id');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class, 'vehicle_id', 'id');
    }
}
