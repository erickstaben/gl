<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 50)->create();

        \App\User::create([
            'name' => 'Moeen Basra',
            'email' => 'm.basra@live.com',
            'password' => bcrypt('secret'),
            'is_admin' => true,
            'remember_token' => str_random(10),
        ]);

        \App\User::create([
            'name' => 'Erick Staben',
            'email' => 'a@a.com',
            'password' => bcrypt('12345678'),
            'is_admin' => true,
            'remember_token' => str_random(10),
        ]);
    }
}
