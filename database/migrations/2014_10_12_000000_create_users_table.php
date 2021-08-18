<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->rememberToken();
            $table->timestamp('created_at')->nullable()->useCurrent();
            $table->timestamp('updated_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

            $table->string('auth_type', 100)->nullable(true)->default('native');
            $table->text('social_data')->nullable(true);
            $table->smallInteger('user_group')->nullable(true)->default(4);
            $table->tinyInteger('banned')->nullable(true)->unsigned()->default(0);
            $table->tinyInteger('allow_mail')->nullable(true)->unsigned()->default(0);
            $table->text('info')->nullable(true);
            $table->string('foto')->nullable(true);
            $table->string('fullname', 100)->nullable(true);
            $table->string('land', 100)->nullable(true);
            $table->text('favorites')->nullable(true);
            $table->string('hash', 32)->nullable(true);
            $table->ipAddress('logged_ip')->nullable(true);
        });
        $controller = new \App\Http\Controllers\MigrateToNewDb();
        $controller->setOldName('4a_users');
        $controller->setNewName('users');
        $controller->migrate();
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
