<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (env('APP_ENV') === 'local') {
            DB::table('users')->insert(
                [
                    'name' => 'Garry Yeatman',
                    'email' => 'garry@yeatman.co.nz',
                    'password' => bcrypt('aaaaaaaa'),
                ]
            );
        }
    }
}
