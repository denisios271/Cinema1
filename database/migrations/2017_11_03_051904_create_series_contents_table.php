<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSeriesContentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('series_contents', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('seria_id')->unsigned();
            $table->integer('player_id')->unsigned();
            $table->string('url');
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
        $controller = new \App\Http\Controllers\MigrateToNewDb();
        $controller->setOldName('4a_series_content');
        $controller->setNewName('series_contents');
        $controller->migrate();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('series_contents');
    }
}
