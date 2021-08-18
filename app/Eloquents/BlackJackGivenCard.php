<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Eloquents\BlackJackGivenCard
 *
 * @property int $id
 * @property int $user_id
 * @property int $game_id
 * @property int $card_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Eloquents\BlackJackCard $card
 * @property-read \App\Eloquents\BlackJackGame $game
 * @property-read mixed $is_server
 * @property-read \App\Eloquents\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGivenCard whereCardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGivenCard whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGivenCard whereGameId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGivenCard whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGivenCard whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackGivenCard whereUserId($value)
 * @mixin \Eloquent
 */
class BlackJackGivenCard extends Model
{
    protected $appends = [
        'is_server',
    ];

    protected $with = [
        'card',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function card()
    {
        return $this->belongsTo(BlackJackCard::class);
    }

    public function game()
    {
        return $this->belongsTo(BlackJackGame::class);
    }

    public function getIsServerAttribute()
    {
        return $this->user_id === null;
    }
}
