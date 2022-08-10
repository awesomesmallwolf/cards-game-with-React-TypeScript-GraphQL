<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        DB::table('users')->insert([
                                       'username' => 'interview',
                                       'email' => 'interview@uplift.agency',
                                       'password' => Hash::make('uplifty'),
                                   ]);

    }
}
