<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class LogicalChangesInPosts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->dropColumn('short_story');
            $table->dropColumn('category');
            $table->dropColumn('year');
            $table->dropColumn('type');
            $table->dropColumn('editor');
            $table->dropColumn('manga');
            $table->dropColumn('author');
            $table->dropColumn('roles');
            $table->dropColumn('seriesCount');

            $table->renameColumn('timer', 'timers');
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
            $table->text('short_story');
            $table->string('category');
            $table->string('year')->nullable();
            $table->string('type')->nullable();
            $table->string('editor')->nullable();
            $table->string('manga')->nullable();
            $table->string('author')->nullable();
            $table->string('roles', 255)->nullable();
            $table->string('seriesCount')->nullable();

            $table->renameColumn('timers', 'timer');
        });
    }
}
