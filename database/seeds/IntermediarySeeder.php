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
            'field_type' => 'input',
            'label' => 'Campo 1',
            'phase_id' => 1,
        ]);

        DB::table('phase_fields')->insert([
            'field_type' => 'select',
            'label' => 'Campo 2',
            'phase_id' => 1,
        ]);

        DB::table('phase_fields')->insert([
            'field_type' => 'input',
            'label' => 'Campo 3',
            'phase_id' => 1,
        ]);

        DB::table('card_phase_field')->insert([
            'value' => 'Campo 3',
            'phase_field_id' => 1,
            'card_id' => 1,
        ]);

        DB::table('card_user')->insert([
            'user_id' => 1,
            'card_id' => 1,
        ]);

        DB::table('pipe_user')->insert([
            'user_id' => 52,
            'pipe_id' => 1,
            'is_favorite' => true,
        ]);

        DB::table('phase_emails')->insert([
            'phase_id' => 1,
            'send_type' => 'out',
            'copy' => '',
            'subject' => 'Algum assunto',
            'content' => 'conteúdo do email',
            'to' => 'erick@staben.com',
        ]);
    }
}
