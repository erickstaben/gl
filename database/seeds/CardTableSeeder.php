<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CardTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    
    {
        DB::table('recurrent_cards')->insert([
            'pipe_id' => 1,
            'user_id' => 1,
            'company_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]); 

        DB::table('cards')->insert([
            'title' => Str::random(10),
            'due_date' => now(),
            'creator_id' => 1,
            'phase_id' => 1,
            'recurrent_card_id' => 1,
            'company_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
