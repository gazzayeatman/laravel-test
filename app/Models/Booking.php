<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class, 'vehicle_id');
    }

    public function location()
    {
        return $this->hasOne(Location::class, 'location_id');
    }

    public function bookingTimes()
    {
        return $this->hasMany(BookingTime::class);
    }

    public function driver()
    {
        return $this->hasOne(Driver::class, 'driver_id');
    }

    public function mainContact()
    {
        return $this->hasOne(Contact::class, 'main_contact_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
