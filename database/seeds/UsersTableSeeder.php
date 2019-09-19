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

        \App\User::create([
            'name' => 'Soely',
            'email' => 'soely@glcontabilidade.cnt.br',
            'password' => bcrypt('12345678'),
            'is_admin' => true,
            'remember_token' => str_random(10),
        ]);

        \App\User::create([
            'name' => 'César',
            'email' => 'cesar@glcontabilidade.cnt.br',
            'password' => bcrypt('12345678'),
            'is_admin' => true,
            'remember_token' => str_random(10),
        ]);

        \App\User::create([
            'name' => 'Erick Staben',
            'email' => 'erick@glcontabilidade.cnt.br',
            'password' => bcrypt('12345678'),
            'is_admin' => true,
            'remember_token' => str_random(10),
        ]);
    }
}
