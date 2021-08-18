<?php

namespace App\Services;

use App\Eloquents\User;
use App\Eloquents\BlackJackGame;
use App\Eloquents\BlackJackCard;
use App\Eloquents\BlackJackGivenCard;

class BlackJackService
{
    /** @var BlackJackGame */
    protected $game;

    /** @var Collection|BlackJackCard[] */
    protected $allCards;

    public function __construct(BlackJackGame $game)
    {
        $this->game = $game;
        $this->allCards = BlackJackCard::get();
    }

    public static function create(User $user): BlackJackGame
    {
        if (BlackJackGame::getNotFinished($user)) {
            throw new \Exception("Вы должны закончить текущую игру перед созданием новой.");
        }
        
        $game = new BlackJackGame;
        $game->user_id = $user->id;
        $game->is_user_have_positive_cards = rand(0, 1);
        $game->save();
        return $game;
    }

    /**
     * Returns all cards in all decks
     *
     * @return Collection
     */
    public function getAllDecksCards()
    {
        $availableCards = collect([]);
        for ($i = 0; $i < BlackJackGame::DECKS_COUNT; $i++) {
            $availableCards = $availableCards->merge($this->allCards);
        }
        return $availableCards;
    }

    /**
     * Returns available cards for playing (will be filtered via already given)
     *
     * @return Collection
     */
    public function getAvailableCards()
    {
        $this->game = $this->game->fresh();
        $allCards = $this->getAllDecksCards();
        $givenCards = $this->game->cards;
        
        // exclude cards from availableCards which exists in givenCards
        foreach ($givenCards as $givenCard) {
            foreach ($allCards as $cardKey => $card) {
                if ($givenCard->card_id != $card->id) {
                    continue;
                }
                $allCards = $allCards->reject(function ($v, $i) use ($cardKey) {
                    return $cardKey === $i;
                });
                break;
            }
        }

        return $allCards;
    }
    
    /**
     * Returns collection from 4 elements
     *
     * @return Collection
     */
    public function getFirstCards()
    {
        $cards = $this->getAvailableCards()->shuffle()->random(2);
        $givenCards = collect([]);

        $opponentCard = new BlackJackGivenCard;
        $opponentCard->game_id = $this->game->id;
        $opponentCard->card_id = $cards[0]->id;
        $opponentCard->user_id = $this->game->opponent_id;
        $opponentCard->save();

        $userCard = new BlackJackGivenCard;
        $userCard->game_id = $this->game->id;
        $userCard->card_id = $cards[1]->id;
        $userCard->user_id = $this->game->user_id;
        $userCard->save();

        $userScore = $cards[1]->rank;

        $givenCards->push($opponentCard);
        $givenCards->push($userCard);

        if ($this->hasUserPointsMoreThan20($userScore, $this->game->is_user_have_positive_cards)) {
            // will be returned final cards
            return $this->stand();
        }

        // will be returned only first 4 cards
        // user can hit/stand
        return $givenCards;
    }

    public function hit()
    {
        $userScore = $this->game->user_score;
        $hasUserEnoughScore = $this->hasUserPointsMoreThan20($userScore, $this->game->is_user_have_positive_cards);
        $hasUserTooManyCards = $this->game->user_given_cards->count() >= 6;
        if ($hasUserEnoughScore || $hasUserTooManyCards) {
            throw new \Exception("Вы не можете взять еще одну карту.");
        }

        $card = $this->getAvailableCards()->shuffle()->random();
        $givenCard = new BlackJackGivenCard;
        $givenCard->game_id = $this->game->id;
        $givenCard->card_id = $card->id;
        $givenCard->user_id = $this->game->user_id;
        $givenCard->save();

        $sumAfterCreation = $givenCard->card->rank + $userScore;
        $hasUserEnoughScoreAfterCardCreation = $this->hasUserPointsMoreThan20($sumAfterCreation, $this->game->is_user_have_positive_cards);
        $hasUserTooManyCardsCountAfterCardCreation = $this->game->user_given_cards->count() >= 6;
        if ($hasUserEnoughScoreAfterCardCreation || $hasUserTooManyCardsCountAfterCardCreation) {
            $this->game = $this->game->fresh();
            return collect([$givenCard])->merge($this->stand()); // we don't want to waste user's time
        }

        return collect([$givenCard]);
    }

    public function stand()
    {
        if ($this->game->is_user_standed) {
            throw new \Exception("Вы уже отказались от карты.");
        }
        $opponentScore = $this->game->opponent_score;

        $this->game->is_user_standed = true;
        $this->game->save();

        $givenCards = collect([]);
        while ($this->hasUserPointsLessThan17($opponentScore, $this->game->is_opponent_have_positive_cards) && $givenCards->count() < 6) {
            $card = $this->getAvailableCards()->shuffle()->random();
            $serverGivenCard = new BlackJackGivenCard;
            $serverGivenCard->game_id = $this->game->id;
            $serverGivenCard->card_id = $card->id;
            $serverGivenCard->user_id = $this->game->opponent_id;
            $serverGivenCard->save();
            $givenCards->push($serverGivenCard);
            $opponentScore += $serverGivenCard->card->rank;
        }

        $this->finishGame();
        return $givenCards;
    }

    /**
     * Should be played till have >= 17
     *
     * @return void
     */
    protected function finishGame()
    {
        $this->game = $this->game->fresh();
        $opponentScore = $this->game->opponent_score;
        $userScore = $this->game->user_score;

        $hasUserPositiveCards = $this->game->is_user_have_positive_cards;
        $hasOpponentPositiveCards = $this->game->is_opponent_have_positive_cards;

        $isUserScoreMoreThan21 = $this->hasUserPointsMoreThan21($userScore, $hasUserPositiveCards);
        $isOpponentScoreMoreThan21 = $this->hasUserPointsMoreThan21($opponentScore, $hasOpponentPositiveCards);
        $fixedUserScore = $hasUserPositiveCards ? $userScore : 0 - $userScore;
        $fixedOpponentScore = $hasOpponentPositiveCards ? $opponentScore : 0 - $opponentScore;
        
        if (($isOpponentScoreMoreThan21 && $isUserScoreMoreThan21) || $fixedUserScore == $fixedOpponentScore) {
            // draw
        } elseif ($isOpponentScoreMoreThan21 || $fixedOpponentScore < $fixedUserScore) {
            // server lost
        } elseif ($isUserScoreMoreThan21 || $fixedOpponentScore > $fixedUserScore) {
            // client lost
        }
        $this->game->is_finished = true;
        $this->game->save();
        return $this->game->fresh()->cards;
    }

    protected function hasUserPointsMoreThan20(int $score, $hasUserPositiveCards): bool
    {
        return $this->hasUserPointsMoreThan($score, $hasUserPositiveCards, 20);
    }

    protected function hasUserPointsMoreThan21(int $score, $hasUserPositiveCards): bool
    {
        return $this->hasUserPointsMoreThan($score, $hasUserPositiveCards, 20);
    }

    protected function hasUserPointsLessThan17(int $score, $hasUserPositiveCards): bool
    {
        return !$this->hasUserPointsMoreThan($score, $hasUserPositiveCards, 16);
    }

    protected function hasUserPointsMoreThan(int $score, $hasUserPositiveCards, int $points): bool
    {
        if ($hasUserPositiveCards) {
            return ($score > $points) ? true : false;
        }
        return ($score < 0 - $points) ? true : false;
    }
}
