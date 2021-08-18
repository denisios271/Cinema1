<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Friend
 *
 * @property int $id
 * @property int $friends_block_id
 * @property string $title
 * @property string $uri
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Friend whereFriendsBlockId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Friend whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Friend whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Friend whereUri($value)
 * @mixin \Eloquent
 */
class Friend extends Model
{
    public function friends_block()
    {
        $this->belongsTo('App\Eloquents\FriendsBlock');
    }
}
