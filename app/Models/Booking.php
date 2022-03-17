<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    public function vehicle()
    {
        return $this->hasOne(Vehicle::class);
    }

    public function location()
    {
        return $this->hasOne(Location::class);
    }

    public function bookingTimes()
    {
        return $this->hasMany(BookingTime::class);
    }

    public function driver()
    {
        return $this->hasOne(Driver::class);
    }

    public function mainContact()
    {
        return $this->hasOne(Contact::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
