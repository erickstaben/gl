<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardPhaseFieldTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card_phase_field', function (Blueprint $table) {
            $table->string('value');

            $table->unsignedBigInteger('card_id');
            $table->foreign('card_id')->references('id')->on('cards');
            
            $table->unsignedBigInteger('phase_field_id');
            $table->foreign('phase_field_id')->references('id')->on('phase_fields');
            $table->primary(['card_id', 'phase_field_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('card_phase_field');
    }
}
