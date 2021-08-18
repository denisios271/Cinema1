<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Collection;

class MigrateToNewDb extends Controller
{
    protected $oldName;
    protected $newName;
    protected $migratedTables = [
        [ '4a_admin_pages', 'admin_pages' ],
        [ '4a_admin_tutorials', 'admin_tutorials' ],
        [ '4a_category', 'categories' ],
        [ '4a_players', 'players' ],
        [ '4a_series', 'series' ],
        [ '4a_series_content', 'series_contents' ],
        [ '4a_type', 'types' ],
        [ '4a_usergroups', 'usergroups' ],
        [ '4a_users', 'users' ],
        [ '4a_posts', 'posts' ],
    ];

    public function setOldName(string $name)
    {
        $this->oldName = $name;
    }

    public function setNewName(string $name)
    {
        $this->newName = $name;
    }

    public function getData()
    {
        return DB::table($this->oldName)->get();
    }

    public function loadData(Collection $data)
    {
        $data = $data->map(function ($value) {
            return (array) $value;
        })->all();
        return DB::table($this->newName)->insert($data);
    }

    public function isNewTableEmpty()
    {
        return DB::table($this->newName)->count() == 0;
    }

    public function fixData(Collection $data)
    {
        $data = $data->map(function ($row) {
            switch($this->newName) {
                case 'users':
                    $row->created_at = date('Y-m-d h:i:s', $row->reg_date);
                    $row->updated_at = date('Y-m-d h:i:s', $row->lastdate);
                    $row->id = $row->user_id;
                    $row->remember_token = $row->token;
                    unset($row->reg_date);
                    unset($row->lastdate);
                    unset($row->user_id);
                    unset($row->token);
                break;

                case 'posts':
                    $row->created_at = $row->date;
                    $row->publisher = DB::table('users')->where('name', $row->publisher)->value('id');
                    unset($row->date);
                break;

                case 'series':
                    $row->type_id = $row->type;
                    unset($row->type);
                break;
            }
            return $row;
        });
        return $data;
    }

    public function removeDataFromNewTable()
    {
        return DB::table($this->newName)->delete();
    }

    public function migrateEverything()
    {
        foreach($this->migratedTables as $table) {
            $this->setOldName($table[0]);
            $this->setNewName($table[1]);
            var_dump($table);
            var_dump($this->migrate());
            echo "<hr>";
        }
    }

    public function migrate($shouldRemoveExistingData = false)
    {
        if (!$this->isNewTableEmpty() && !$shouldRemoveExistingData) {
            return false;
        }
        if ($shouldRemoveExistingData) {
            $this->removeDataFromNewTable();
        }
        $data = $this->getData();
        $data = $this->fixData($data);
        return $this->loadData($data);
    }
}
