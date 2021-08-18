<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\FriendsBlock
 *
 * @property int $id
 * @property string $title
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Friend[] $data
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FriendsBlock whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FriendsBlock whereTitle($value)
 * @mixin \Eloquent
 */
class FriendsBlock extends Model
{
    public function data()
    {
        return $this->hasMany('App\Eloquents\Friend');
    }
}
