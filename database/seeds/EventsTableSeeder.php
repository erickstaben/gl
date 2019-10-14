<?php

use Illuminate\Database\Seeder;

class EventsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $user = \App\User::findOrFail(3);
        factory(App\Event::class, 50)->create([
            'user_id' => $user->id,
            'company_id' => 1,
        ]);
    }
}
