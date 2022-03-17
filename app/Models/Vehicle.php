<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    public function driver()
    {
        return $this->hasMany(Contact::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
