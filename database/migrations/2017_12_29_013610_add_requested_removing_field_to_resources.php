<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRequestedRemovingFieldToResources extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->integer('requested_removing_user')->unsigned()->nullable()->default(null);
        });
        Schema::table('users', function (Blueprint $table) {
            $table->integer('requested_removing_user')->unsigned()->nullable()->default(null);
        });
        Schema::table('series', function (Blueprint $table) {
            $table->integer('requested_removing_user')->unsigned()->nullable()->default(null);
        });
        Schema::table('categories', function (Blueprint $table) {
            $table->integer('requested_removing_user')->unsigned()->nullable()->default(null);
        });
        Schema::table('news', function (Blueprint $table) {
            $table->integer('requested_removing_user')->unsigned()->nullable()->default(null);
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
            $table->dropColumn('requested_removing_user');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('requested_removing_user');
        });
        Schema::table('series', function (Blueprint $table) {
            $table->dropColumn('requested_removing_user');
        });
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('requested_removing_user');
        });
        Schema::table('news', function (Blueprint $table) {
            $table->dropColumn('requested_removing_user');
        });
    }
}
