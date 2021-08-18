<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRequestedAddingField extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->boolean('requested_adding')->nullable()->default(0);
            $table->integer('requested_adding_user')->unsigned()->nullable()->default(null);
        });
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('requested_adding')->nullable()->default(0);
            $table->integer('requested_adding_user')->unsigned()->nullable()->default(null);
        });
        Schema::table('series', function (Blueprint $table) {
            $table->boolean('requested_adding')->nullable()->default(0);
            $table->integer('requested_adding_user')->unsigned()->nullable()->default(null);
        });
        Schema::table('categories', function (Blueprint $table) {
            $table->boolean('requested_adding')->nullable()->default(0);
            $table->integer('requested_adding_user')->unsigned()->nullable()->default(null);
        });
        Schema::table('articles', function (Blueprint $table) {
            $table->boolean('requested_adding')->nullable()->default(0);
            $table->integer('requested_adding_user')->unsigned()->nullable()->default(null);
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
            $table->dropColumn('requested_adding');
            $table->dropColumn('requested_adding_user');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('requested_adding');
            $table->dropColumn('requested_adding_user');
        });
        Schema::table('series', function (Blueprint $table) {
            $table->dropColumn('requested_adding');
            $table->dropColumn('requested_adding_user');
        });
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('requested_adding');
            $table->dropColumn('requested_adding_user');
        });
        Schema::table('articles', function (Blueprint $table) {
            $table->dropColumn('requested_adding');
            $table->dropColumn('requested_adding_user');
        });
    }
}
