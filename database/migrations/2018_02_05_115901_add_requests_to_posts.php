<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddRequestsToPosts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('posts', function (Blueprint $table) {
            $table->biginteger('requests')->nullable()->default(0);
        });
        Schema::table('news', function (Blueprint $table) {
            $table->biginteger('requests')->nullable()->default(0);
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
            $table->dropColumn('requests');
        });
        Schema::table('news', function (Blueprint $table) {
            $table->dropColumn('requests');
        });
    }
}
