<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    public function contacts()
    {
        return $this->hasMany(Contact::class);
    }

    public function mainContact()
    {
        return $this->hasOne(Contact::class. 'main_contact_id');
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
