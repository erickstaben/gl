<?php

use Illuminate\Database\Seeder;

class PhaseTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('phases')->insert([
            'name' => 'fase 3',
            'is_final' => true,
            'order' => 3,
            'description' => 'Alguma descrição',
            'client_status' => 'Finalizado',
            'pipe_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('phases')->insert([
            'name' => 'fase 2',
            'is_final' => false,
            'order' => 2,
            'description' => 'Alguma descrição 2',
            'client_status' => 'Em andamento',
            'pipe_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('phases')->insert([
            'name' => 'fase 1',
            'is_final' => false,
            'order' => 1,
            'description' => 'Alguma descrição 3',
            'client_status' => 'Não iniciado',
            'pipe_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
