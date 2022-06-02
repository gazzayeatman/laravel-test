<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class FixingBookingTimes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('booking_times', function (Blueprint $table) {
            $table->time('startTime')->change();
            $table->time('endTime')->change();
            $table->date('date')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('booking_times', function (Blueprint $table) {
            $table->dateTime('startTime')->change();
            $table->dateTime('endTime')->change();
            $table->dropColumn('date');
        });
    }
}
