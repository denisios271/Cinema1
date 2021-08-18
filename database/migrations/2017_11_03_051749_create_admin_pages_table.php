<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAdminPagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admin_pages', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('uri');
            $table->integer('rights');
            $table->integer('parent_id')->unsigned()->nullable()->default(null);
            $table->tinyInteger('is_hidden')->nullable()->default(0);
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        });
        $controller = new \App\Http\Controllers\MigrateToNewDb();
        $controller->setOldName('4a_admin_pages');
        $controller->setNewName('admin_pages');
        $controller->migrate();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('admin_pages');
    }
}
