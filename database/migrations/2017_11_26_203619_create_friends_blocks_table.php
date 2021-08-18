<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFriendsBlocksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('friends_blocks', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
        });
        DB::table('friends_blocks')->insert([[
            'title' => 'Мы на других ресурсах',
        ],[
            'title' => 'Друзья проекта',
        ],[
            'title' => 'Разработчики',
        ],[
            'title' => 'Быстрая навигация',
        ]]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('friends_blocks');
    }
}
