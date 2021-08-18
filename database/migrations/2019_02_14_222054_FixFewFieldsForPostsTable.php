<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class FixFewFieldsForPostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::table('posts')->where('keywords', null)->update([ 'keywords' => '' ]);
        DB::table('posts')->where('tags', null)->update([ 'tags' => '' ]);
        DB::table('posts')->where('voicers', null)->update([ 'voicers' => '' ]);
        DB::table('posts')->where('translaters', null)->update([ 'translaters' => '' ]);
        DB::table('posts')->where('timers', null)->update([ 'timers' => '' ]);

        Schema::table('posts', function (Blueprint $table) {
            $table->string('keywords')->nullable(false)->default('')->change();
            $table->string('tags')->nullable(false)->default('')->change();
            $table->string('voicers')->nullable(false)->default('')->change();
            $table->string('translaters')->nullable(false)->default('')->change();
            $table->string('timers')->nullable(false)->default('')->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->text('keywords')->nullable(true)->default(null)->change();
            $table->string('tags')->nullable(true)->default(null)->change();
            $table->string('voicers')->nullable(true)->default(null)->change();
            $table->string('translaters')->nullable(true)->default(null)->change();
            $table->string('timers')->nullable(true)->default(null)->change();
        });

        DB::table('posts')->where('keywords', '')->update([ 'keywords' => null ]);
        DB::table('posts')->where('tags', '')->update([ 'tags' => null ]);
        DB::table('posts')->where('voicers', '')->update([ 'voicers' => null ]);
        DB::table('posts')->where('translaters', '')->update([ 'translaters' => null ]);
        DB::table('posts')->where('timers', '')->update([ 'timers' => null ]);
    }
}
