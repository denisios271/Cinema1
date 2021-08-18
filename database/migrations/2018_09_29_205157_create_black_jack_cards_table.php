<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Eloquents\BlackJackCard;
use Illuminate\Support\Facades\Artisan;

class CreateBlackJackCardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('black_jack_cards', function (Blueprint $table) {
            $table->increments('id');
            $table->smallInteger('rank');
            $table->string('title');
            $table->text('description');
            $table->integer('sounds_count');
        });
        Artisan::call('db:seed', [
            '--class' => BlackJackCardsTableSeeder::class,
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('black_jack_cards');
    }
}
