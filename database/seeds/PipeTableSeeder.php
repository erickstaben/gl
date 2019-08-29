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
            'name' => 'pipe 1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
