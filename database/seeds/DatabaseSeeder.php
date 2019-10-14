<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $this->call([UsersTableSeeder::class]);
         $this->call([
            CompanyTableSeeder::class,
            PipeTableSeeder::class,
            PhaseTableSeeder::class,
            CardTableSeeder::class,
            IntermediarySeeder::class,
            EventsTableSeeder::class,
         ]);
    }
}
