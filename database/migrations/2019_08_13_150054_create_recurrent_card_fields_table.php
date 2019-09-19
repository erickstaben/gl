<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRecurrentCardFieldsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        Schema::create('recurrent_card_fields', function (Blueprint $table) {
            $table->bigIncrements('id');
            
            
            $table->unsignedBigInteger('recurrent_card_id')->nullable();
            $table->foreign('recurrent_card_id')->references('id')->on('recurrent_cards');

            
            $table->unsignedBigInteger('phase_field_id')->nullable();
            $table->foreign('phase_field_id')->references('id')->on('phase_fields');

            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(){
        Schema::dropIfExists('recurrent_card_fields');
    }
}
