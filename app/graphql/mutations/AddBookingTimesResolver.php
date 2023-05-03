<?php

namespace App\GraphQL\Mutations;

use App\Models\Booking;
use App\Models\BookingTime;

/**
 * Custom resolver for creating a new order
 */
final class AddBookingTimesResolver
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $bookingID = isset($args['booking']) ? $args['booking'] : false;
        $bookingTimes = isset($args['bookingTimes']) ? json_decode($args['bookingTimes']) : false;
        
        $booking = Booking::findOrFail($bookingID);

        foreach ($bookingTimes as $bookingTime) {
            $time = BookingTime::create();
            $time->startTime = $bookingTime->startTime;
            $time->endTime = $bookingTime->endTime;
            $time->date = $bookingTime->date;
            $time->booking_id = $booking->id;
            $time->save();
        }

        return true;
    }
}
