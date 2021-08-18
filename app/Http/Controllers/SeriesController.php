<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Eloquents\Post;
use App\Eloquents\Type;
use App\Eloquents\Players;
use App\Eloquents\Series;
use App\Eloquents\Series_content;

class SeriesController extends ResourceController
{
    protected $class = Series::class;

    /**
     * Players for inserting/updating (series can't contain all players into one DB)
     *
     * @var array
     */
    protected $players = [];

    /**
     * Saved series id for removing players
     *
     * @var integer
     */
    protected $seriesId = null;

    protected $relationships = [
        'players.player',
        'type',
    ];

    protected $validationRules = [
        'post_id' => 'integer|exists:posts,id',
        'name' => 'required|string|min:1',
        'type_id' => 'required|integer|exists:types,id',
        'players' => 'required|array|min:1',
    ];

    protected function getNotFoundMessage()
    {
        return [
            'error' => 'Нет такой серии.',
        ];
    }

    protected function beforeInserting()
    {
        $this->players = $this->fixPlayers($this->object->players);
        unset($this->object->players);
    }
    
    protected function beforeUpdating()
    {
        $this->players = $this->fixPlayers($this->object->players);
        unset($this->object->players);
    }

    protected function afterInserting()
    {
        $this->addPlayers();
        if ($this->object->post && !$this->object->requested_adding) {
            broadcast(new \App\Events\NewEpisode($this->object));
        }
    }

    protected function afterUpdating()
    {
        \DB::table('series_contents')->where('seria_id', $this->object->id)->delete();
        $this->addPlayers();
    }

    protected function beforeRemoving()
    {
        $this->seriesId = $this->object->id;
    }

    protected function afterRemoving()
    {
        if ($this->seriesId !== null) {
            \DB::table('series_contents')->where('seria_id', $this->seriesId)->delete();
        }
    }

    protected function fixPlayers($players)
    {
        foreach ($players as $playerId => $playerContent) {
            $players[$playerId] = $this->fixPlayer($playerContent);
        }
        return $players;
    }

    protected function fixPlayer($str)
    {
        $fromIframe = "/iframe(.*)src( *)=( *)(\"|')([^\"']+)(\"|')(.*)\/iframe/";
        if (preg_match($fromIframe, $str, $matches)) {
            if (isset($matches[5])) {
                $str = $matches[5];
            }
        }
        $str = str_replace("http://", "//", $str);
        $str = str_replace("https://", "//", $str);
        $str = str_replace("hdgo.cc", "hdgo.cx", $str);
        return $str;
    }

    protected function addPlayers()
    {
        foreach ($this->players as $playerId => $playerContent) {
            if ($playerContent) {
                $currentPlayer = new Series_content();
                $currentPlayer->seria_id = $this->object->id;
                $currentPlayer->player_id = $playerId;
                $currentPlayer->url = $playerContent;
                $currentPlayer->save();
            }
        }
    }

    protected function afterInsertAccepting()
    {
        if ($this->object->post && !$this->object->requested_adding) {
            broadcast(new \App\Events\NewEpisode($this->object));
        }
    }
}
