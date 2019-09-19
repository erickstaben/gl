<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card_logs', function (Blueprint $table) {
            $table->bigIncrements('id');

            
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');

            
            $table->unsignedBigInteger('card_id');
            $table->foreign('card_id')->references('id')->on('cards');

            
            $table->unsignedBigInteger('phase_id');
            $table->foreign('phase_id')->references('id')->on('phases');

            
            $table->unsignedBigInteger('new_phase_id');
            $table->foreign('new_phase_id')->references('id')->on('phases');

            $table->string('action')->default('move');
            $table->string('duration')->nullable();
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
        Schema::dropIfExists('card_logs');
    }
}
