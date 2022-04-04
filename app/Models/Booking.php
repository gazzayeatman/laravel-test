<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Booking extends Model
{
    use HasFactory;

    public function vehicle(): HasOne
    {
        return $this->hasOne(Vehicle::class, 'vehicle_id');
    }

    public function location(): HasOne
    {
        return $this->hasOne(Location::class, 'location_id');
    }

    public function bookingTimes(): HasMany
    {
        return $this->hasMany(BookingTime::class);
    }

    public function driver(): HasOne
    {
        return $this->hasOne(Driver::class, 'driver_id');
    }

    public function mainContact(): HasOne
    {
        return $this->hasOne(Contact::class, 'main_contact_id');
    }

    public function notes(): HasMany
    {
        return $this->hasMany(Note::class);
    }
}
