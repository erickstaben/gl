<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePhasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('phases', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->boolean('is_final')->default(false);
            $table->unsignedBigInteger('order');
            $table->string('description');
            $table->integer('due_date')->nullable();
            $table->boolean('postpone')->default(false);
            $table->string('client_status');

            $table->unsignedBigInteger('pipe_id');
            $table->foreign('pipe_id')->references('id')->on('pipes');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('phases');
    }
}
