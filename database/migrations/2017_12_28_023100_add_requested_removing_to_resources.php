<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRequestedRemovingToResources extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->boolean('requested_removing')->nullable()->default(0);
        });
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('requested_removing')->nullable()->default(0);
        });
        Schema::table('series', function (Blueprint $table) {
            $table->boolean('requested_removing')->nullable()->default(0);
        });
        Schema::table('categories', function (Blueprint $table) {
            $table->boolean('requested_removing')->nullable()->default(0);
        });
        Schema::table('news', function (Blueprint $table) {
            $table->boolean('requested_removing')->nullable()->default(0);
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
            $table->dropColumn('requested_removing');
        });
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('requested_removing');
        });
        Schema::table('series', function (Blueprint $table) {
            $table->dropColumn('requested_removing');
        });
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('requested_removing');
        });
        Schema::table('news', function (Blueprint $table) {
            $table->dropColumn('requested_removing');
        });
    }
}
