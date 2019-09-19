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
            'name' => 'Em pausa',
            'is_final' => true,
            'order' => 4,
            'description' => 'Alguma descrição',
            'client_status' => 'Finalizado',
            'pipe_id' => 1,
            'due_date' => 8,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('phases')->insert([
            'name' => 'Concluídos',
            'is_final' => true,
            'order' => 3,
            'description' => 'Alguma descrição',
            'client_status' => 'Finalizado',
            'pipe_id' => 1,
            'due_date' => 8,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('phases')->insert([
            'name' => 'Em andamento',
            'is_final' => false,
            'order' => 2,
            'description' => 'Alguma descrição 2',
            'client_status' => 'Em andamento',
            'pipe_id' => 1,
            'due_date' => 8,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('phases')->insert([
            'name' => 'Pendentes',
            'is_final' => false,
            'order' => 1,
            'description' => 'Alguma descrição 3',
            'client_status' => 'Não iniciado',
            'pipe_id' => 1,
            'due_date' => 15,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
