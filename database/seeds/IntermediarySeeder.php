<?php

use Illuminate\Database\Seeder;

class IntermediarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('phase_fields')->insert([
            'field_type' => 'checkbox',
            'label' => 'PIS',
            'postpone' => 0,
            'due_date' => 25,
            'phase_id' => 3,
        ]);

        DB::table('phase_fields')->insert([
            'field_type' => 'checkbox',
            'label' => 'IPI',
            'postpone' => 0,
            'due_date' => 25,
            'phase_id' => 3,
        ]);

        DB::table('phase_fields')->insert([
            'field_type' => 'checkbox',
            'label' => 'COFINS',
            'postpone' => 0,
            'due_date' => 25,
            'phase_id' => 3,
        ]);

        DB::table('phase_fields')->insert([
            'field_type' => 'checkbox',
            'label' => 'ISS', 
            'postpone' => 1,
            'due_date' => 20,
            'phase_id' => 3,
        ]);

        DB::table('phase_fields')->insert([
            'field_type' => 'checkbox',
            'label' => 'DAS', 
            'postpone' => 1,
            'due_date' => 20,
            'phase_id' => 3,
        ]);

        DB::table('phase_fields')->insert([
            'field_type' => 'checkbox',
            'label' => 'GRPR', 
            'postpone' => 1,
            'due_date' => 12,
            'phase_id' => 3,
        ]);

        DB::table('phase_fields')->insert([
            'field_type' => 'checkbox',
            'label' => 'GRNE', 
            'postpone' => 1,
            'due_date' => 2,
            'phase_id' => 3,
        ]);

        DB::table('phase_fields')->insert([
            'field_type' => 'checkbox',
            'label' => 'Documentos enviados ao cliente',
            'phase_id' => 2,
        ]);

        DB::table('card_user')->insert([
            'user_id' => 1,
            'card_id' => 1,
        ]);

        DB::table('pipe_user')->insert([
            'user_id' => 3,
            'pipe_id' => 1,
            'is_favorite' => true,
        ]);

        DB::table('pipe_user')->insert([
            'user_id' => 2,
            'pipe_id' => 1,
            'is_favorite' => true,
        ]);
    }
}
