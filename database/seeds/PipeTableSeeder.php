<?php

use Illuminate\Database\Seeder;

class PipeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pipes')->insert([
            'name' => 'Escrituração Fiscal Simples',
            'email_on_completion' => true,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
