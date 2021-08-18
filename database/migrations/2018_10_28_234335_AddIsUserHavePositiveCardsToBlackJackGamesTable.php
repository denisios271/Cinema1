<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIsUserHavePositiveCardsToBlackJackGamesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('black_jack_games', function (Blueprint $table) {
            $table->boolean('is_user_have_positive_cards')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('black_jack_games', function (Blueprint $table) {
            $table->dropColumn('is_user_have_positive_cards');
        });
    }
}
