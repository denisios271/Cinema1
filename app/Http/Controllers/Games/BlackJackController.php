<?php

namespace App\Http\Controllers\Games;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Services\BlackJackService;
use App\Eloquents\BlackJackGame;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Eloquents\BlackJackCard;

class BlackJackController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'api']);
    }

    protected function response(BlackJackGame $game)
    {
        $game = $game->fresh();
        return [
            'game' => $game,
            'cards' => $game->cards,
            'allCards' => BlackJackCard::get(),
        ];
    }

    public function getCurrentGame()
    {
        $user = Auth::user();
        $game = BlackJackGame::getNotFinished($user);
        abort_if(!$game, Response::HTTP_NOT_FOUND);
        return $this->response($game);
    }

    public function createAndStartGame()
    {
        $user = Auth::user();
        $game = BlackJackService::create($user);
        $service = new BlackJackService($game);
        return $this->response($game);
    }

    public function hit($gameId)
    {
        $user = Auth::user();
        $game = BlackJackGame::findOrFail($gameId);
        abort_if($game->user_id != $user->id, Response::HTTP_FORBIDDEN);
        $service = new BlackJackService($game);
        return $service->hit();
    }

    public function stand($gameId)
    {
        $user = Auth::user();
        $game = BlackJackGame::findOrFail($gameId);
        abort_if($game->user_id != $user->id, Response::HTTP_FORBIDDEN);
        $service = new BlackJackService($game);
        return $service->stand();
    }
}
