<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CompanyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('companies')->insert([
            'name' => Str::random(10),
            'cnpj' => '05.875.767/0001-88',
            'contact_email' => Str::random(10).'@gmail.com',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('companies')->insert([
            'name' => Str::random(10),
            'cnpj' => '06.777.123/0001-88',
            'contact_email' => Str::random(10).'@hotmail.com',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
