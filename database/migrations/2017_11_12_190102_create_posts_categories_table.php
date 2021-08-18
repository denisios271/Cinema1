<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class CreatePostsCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('post_id')->unsigned();
            $table->integer('category_id')->unsigned();
        });

        // so we should add all current categories to new table
        $posts = DB::table('posts')->get();
        foreach ($posts as $post) {
            $categories = explode(',', $post->category);
            foreach ($categories as $category) {
                if ($category) {
                    DB::table('posts_categories')->insert([
                        'post_id' => $post->id,
                        'category_id' => $category,
                    ]);
                }
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
        Schema::dropIfExists('posts_categories');
    }
}
