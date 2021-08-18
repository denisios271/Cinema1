<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Eloquents\BlackJackCard;

class AddNegativeCardsToCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Artisan::call('db:seed', [
            '--class' => BlackJackCardsTableSeeder::class,
        ]);
        $cardsCount = count(BlackJackCardsTableSeeder::AVAILABLE_CARDS);
        $cards = BlackJackCard::take($cardsCount)->latest('id')->get();
        foreach ($cards as $card) {
            if ($card->rank == 0) {
                $card->delete();
            } else {
                $card->rank = 0 - $card->rank;
                $card->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $cardsCount = count(BlackJackCardsTableSeeder::AVAILABLE_CARDS);
        $cardsCount--; // there is a '0' card - it hasn't duplicate
        BlackJackCard::take($cardsCount)->latest('id')->delete();
    }
}
