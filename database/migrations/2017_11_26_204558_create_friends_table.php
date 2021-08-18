<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFriendsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('friends', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('friends_block_id')->unsigned();
            $table->string('title');
            $table->string('uri');
        });
        DB::table('friends')->insert([
            [ 'friends_block_id' => 1, 'title' => 'FireDub - Канал на Муви.тв', 'uri' => '//www.myvi.tv/idb7ay' ],
            [ 'friends_block_id' => 1, 'title' => 'FireDub на Rutube', 'uri' => '//rutube.ru/video/person/1312727/' ],
            [ 'friends_block_id' => 1, 'title' => 'FireDub на Сибнет', 'uri' => '//video.sibnet.ru/users/FireDub/' ],
            [ 'friends_block_id' => 1, 'title' => 'FireDub на Dailymotion', 'uri' => '//www.dailymotion.com/firedub_net' ],

            [ 'friends_block_id' => 2, 'title' => 'Yummy Anime', 'uri' => '//yummyanime.com/' ],
            [ 'friends_block_id' => 2, 'title' => 'Refife-Team', 'uri' => '//vk.com/refifeteam' ],
            [ 'friends_block_id' => 2, 'title' => 'MiraiDuB', 'uri' => '//vk.com/mirai_dub' ],
            [ 'friends_block_id' => 2, 'title' => 'FSG CARDINALS', 'uri' => '//vk.com/fsgcardinals' ],
            [ 'friends_block_id' => 2, 'title' => 'fan-sub ▹ ▸ très bien ◂ ◃', 'uri' => '//vk.com/trsben' ],

            [ 'friends_block_id' => 3, 'title' => 'Дизайн: Маргарита Сапожникова', 'uri' => '//devign.ru/' ],
            [ 'friends_block_id' => 3, 'title' => 'Разработчик: Владимир Рябцев', 'uri' => '//vk.com/tokiseven' ],

            [ 'friends_block_id' => 4, 'title' => 'Главная', 'uri' => '/' ],
            [ 'friends_block_id' => 4, 'title' => 'Аниме Онлайн', 'uri' => '/search/category/anime/' ],
            [ 'friends_block_id' => 4, 'title' => 'Дорамы Онлайн', 'uri' => '/search/category/drama/' ],
            [ 'friends_block_id' => 4, 'title' => 'Фильмы Онлайн', 'uri' => '/search/category/films/' ],
            [ 'friends_block_id' => 4, 'title' => 'Поиск', 'uri' => '/search/' ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('friends');
    }
}
