<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCardEmailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card_emails', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('status');
            $table->string('subject');
            $table->string('to');
            $table->string('content');
            $table->unsignedBigInteger('phase_email_id');
            $table->foreign('phase_email_id')->references('id')->on('phase_emails');
            $table->unsignedBigInteger('card_id');
            $table->foreign('card_id')->references('id')->on('cards');
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
        Schema::dropIfExists('card_emails');
    }
}
