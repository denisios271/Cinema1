<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
            $table->integer('publisher')->unsigned();
            $table->text('full_story');
            $table->text('short_story');
            $table->string('title');
            $table->text('keywords')->nullable();
            $table->string('category');
            $table->string('alt_name');
            $table->string('tags')->nullable();
            $table->string('poster')->nullable();
            $table->string('trailer')->nullable();
            $table->string('year')->nullable();
            $table->string('voicers')->nullable();
            $table->string('translaters')->nullable();
            $table->string('type')->nullable();
            $table->string('editor')->nullable();
            $table->string('manga')->nullable();
            $table->string('author')->nullable();
            $table->string('roles', 255)->nullable();
            $table->string('timer')->nullable();
            $table->string('seriesCount')->nullable();
        });
        $controller = new \App\Http\Controllers\MigrateToNewDb();
        $controller->setOldName('4a_posts');
        $controller->setNewName('posts');
        $controller->migrate();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
