<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\FavoritePost
 *
 * @property int $id
 * @property int $post_id
 * @property int $user_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Post $post
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FavoritePost whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FavoritePost whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FavoritePost wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FavoritePost whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FavoritePost whereUserId($value)
 * @mixin \Eloquent
 */
class FavoritePost extends Model
{
    protected $fillable = ['user_id', 'post_id'];

    public function user()
    {
        return $this->belongsTo('App\Eloquents\User');
    }

    public function post()
    {
        return $this->belongsTo('App\Eloquents\Post');
    }
}
