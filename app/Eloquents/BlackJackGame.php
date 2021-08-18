<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Eloquents\BlackJackGame
 *
 * @property int $id
 * @property int $user_id
 * @property int|null $opponent_id
 * @property int $is_user_standed
 * @property int $is_opponent_standed
 * @property int $is_finished
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property int $is_user_have_positive_cards
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquents\BlackJackGivenCard[] $cards
 * @property-read mixed $finished_date_timestamp
 * @property-read mixed $is_opponent_have_positive_cards
 * @property-read mixed $opponent_given_cards
 * @property-read mixed $opponent_score
 * @property-read mixed $user_given_cards
 * @property-read mixed $user_score
 * @property-read \App\Eloquents\User|null $opponent
 * @property-read \App\Eloquents\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGame whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGame whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGame whereIsFinished($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGame whereIsOpponentStanded($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGame whereIsUserHavePositiveCards($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGame whereIsUserStanded($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGame whereOpponentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGame whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGame whereUserId($value)
 * @mixin \Eloquent
 */
class BlackJackGame extends Model
{
    const DECKS_COUNT = 1;

    protected $appends = [
        'finished_date_timestamp',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function opponent()
    {
        return $this->belongsTo(User::class);
    }

    public function getFinishedDateTimestampAttribute()
    {
        return $this->finished_date ? $this->finished_date->timestamp : null;
    }

    public static function getNotFinished(User $user)
    {
        return self::whereUserId($user->id)->whereIsFinished(false)->first();
    }

    public function cards()
    {
        return $this->hasMany(BlackJackGivenCard::class, 'game_id');
    }

    public function getOpponentGivenCardsAttribute()
    {
        return $this->cards()->whereUserId($this->opponent_id)->get();
    }

    public function getUserGivenCardsAttribute()
    {
        return $this->cards()->whereUserId($this->user_id)->get();
    }

    public function getOpponentScoreAttribute()
    {
        $sum = 0;
        foreach ($this->opponent_given_cards as $opponentGivenCard) {
            $sum += $opponentGivenCard->card->rank;
        }
        return $sum;
    }

    public function getUserScoreAttribute()
    {
        $sum = 0;
        foreach ($this->user_given_cards as $userGivenCard) {
            $sum += $userGivenCard->card->rank;
        }
        return $sum;
    }

    public function getIsOpponentHavePositiveCardsAttribute()
    {
        return !$this->is_user_have_positive_cards;
    }
}
