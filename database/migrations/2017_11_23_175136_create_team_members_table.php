<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTeamMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('roles');
            $table->string('links');
            $table->string('image_uri');
            $table->integer('order')->unsigned()->default(0);
        });
        DB::table('team_members')->insert([
            [ 'name' => 'Fretta', 'roles' => 'Глава проекта, Даббер', 'image_uri' => '/images/team/fretta.jpg', 'links' => 'vk|//vk.com/fretta_dub', ],
            [ 'name' => 'Daker', 'roles' => 'Даббер', 'image_uri' => '/images/team/daker.jpg', 'links' => 'vk|//vk.com/daker_9729', ],
            [ 'name' => 'Мираль', 'roles' => 'Даббер', 'image_uri' => '/images/team/miral.jpg', 'links' => 'vk|//vk.com/id89587958', ],
            [ 'name' => 'Кеша', 'roles' => 'Переводчик', 'image_uri' => '/images/team/kesha.jpg', 'links' => 'vk|//vk.com/keshadn', ],
            [ 'name' => 'AshVoice', 'roles' => 'Даббер', 'image_uri' => '/images/team/ashvoice.jpg', 'links' => 'vk|//vk.com/id430429827', ],
            [ 'name' => 'Karipso', 'roles' => 'Даббер', 'image_uri' => '/images/team/noname.jpg', 'links' => 'vk|//vk.com/karipso', ],
            [ 'name' => 'TokiSeven', 'roles' => 'Сайт, Даббер', 'image_uri' => '/images/team/tokiseven.jpg', 'links' => 'vk|//vk.com/tokiseven', ],
            [ 'name' => 'Okami', 'roles' => 'Даббер', 'image_uri' => '/images/team/okami.jpg', 'links' => 'vk|//vk.com/0kami', ],
            [ 'name' => 'Froztbite', 'roles' => 'Даббер', 'image_uri' => '/images/team/froztbite.jpg', 'links' => 'vk|//vk.com/froztbite', ],
            [ 'name' => 'CaliBri', 'roles' => 'Даббер', 'image_uri' => '/images/team/noname.jpg', 'links' => 'vk|//vk.com/id101627778', ],
            [ 'name' => 'MarieFunker', 'roles' => 'Даббер', 'image_uri' => '/images/team/mariefunker.jpg', 'links' => 'vk|//vk.com/marie_funker', ],
            [ 'name' => 'Snailhuk', 'roles' => 'Даббер', 'image_uri' => '/images/team/snailhuk.jpg', 'links' => 'vk|//vk.com/toxencii', ],
            [ 'name' => 'Eugene', 'roles' => 'Даббер', 'image_uri' => '/images/team/noname.jpg', 'links' => 'vk|//vk.com/activate', ],
            [ 'name' => 'Ray', 'roles' => 'Даббер', 'image_uri' => '/images/team/ray.jpg', 'links' => 'vk|//vk.com/nightwulf24', ],
            [ 'name' => 'Neko', 'roles' => 'Даббер', 'image_uri' => '/images/team/neko.jpg', 'links' => 'vk|//vk.com/canon_white', ],
            [ 'name' => 'DexSex(╯︵╰,)', 'roles' => 'Даббер', 'image_uri' => '/images/team/dexsex.jpg', 'links' => 'vk|//vk.com/legalkiller', ],
            [ 'name' => 'Lucky4', 'roles' => 'Даббер', 'image_uri' => '/images/team/lucky4.jpg', 'links' => 'vk|//vk.com/', ],
            // [ 'name' => '', 'roles' => 'Даббер', 'image_uri' => '/images/team/noname.jpg', 'links' => 'vk|//vk.com/', ],
            [ 'name' => 'Gareligos', 'roles' => 'Даббер', 'image_uri' => '/images/team/gareligos.jpg', 'links' => 'vk|//vk.com/1lllalexandrlll1', ],
            [ 'name' => 'Константин Кураев', 'roles' => 'Даббер', 'image_uri' => '/images/team/konstantin.jpg', 'links' => 'vk|//vk.com/ksedden_page', ],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('team_members');
    }
}
