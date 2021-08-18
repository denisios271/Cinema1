<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAuthorizationLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('authorization_logs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->nullable(true);
            $table->boolean('is_successfully');
            $table->string('email')->nullable(true);
            $table->string('ip');
            $table->string('user_agent')->nullable(true);
            $table->string('http_referer')->nullable(true);
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
        Schema::dropIfExists('authorization_logs');
    }
}
