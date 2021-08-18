<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBlackJackGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('black_jack_games', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id');
            $table->integer('opponent_id')->nullable(true)->default(null);
            $table->boolean('is_user_standed')->default(0);
            $table->boolean('is_opponent_standed')->default(0);
            $table->boolean('is_finished')->default(0);
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
        Schema::dropIfExists('black_jack_games');
    }
}
