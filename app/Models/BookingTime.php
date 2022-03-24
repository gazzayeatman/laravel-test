<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BookingTime extends Model
{
    use HasFactory;

    public function booking()
    {
        return $this->belongsTo(Booking::class, 'booking_id');
    }

    public function driver()
    {
        return $this->hasOne(Driver::class, 'driver_id');
    }

    public function notes()
    {
        return $this->hasMany(Note::class);
    }
}
