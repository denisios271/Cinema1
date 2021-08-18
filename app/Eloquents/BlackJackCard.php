<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Eloquents\BlackJackCard
 *
 * @property int $id
 * @property int $rank
 * @property string $title
 * @property string $description
 * @property int $sounds_count
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackCard whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackCard whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackCard whereRank($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackCard whereSoundsCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\BlackJackCard whereTitle($value)
 * @mixin \Eloquent
 */
class BlackJackCard extends Model
{
    public $timestamps = false;
}
