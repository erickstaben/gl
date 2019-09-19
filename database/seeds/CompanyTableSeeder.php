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
            'name' => 'Empresa TESTE',
            'cnpj' => '05.875.767/0001-88',
            'contact_email' => 'ericklucasstaben@hotmail.com',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
