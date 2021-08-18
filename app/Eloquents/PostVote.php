<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Eloquents\PostVote
 *
 * @property int $id
 * @property int $user_id
 * @property int $post_id
 * @property int $vote
 * @property int $is_old
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Eloquents\Post $post
 * @property-read \App\Eloquents\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostVote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostVote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostVote whereIsOld($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostVote wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostVote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostVote whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostVote whereVote($value)
 * @mixin \Eloquent
 */
class PostVote extends Model
{
    const MAX_VOTE = 5;
    const MIN_VOTE = 0;

    protected $fillable = [
        'user_id',
        'post_id',
        'vote',
    ];

    public static function getOnlyActiveFirst($queryBuilder = null)
    {
        return self::onlyActiveScope($queryBuilder)->first();
    }

    public static function getOnlyActiveList($queryBuilder = null)
    {
        return self::onlyActiveScope($queryBuilder)->get();
    }

    public static function onlyActiveScope($queryBuilder = null)
    {
        if ($queryBuilder) {
            return $queryBuilder->whereIsOld(false);
        }
        return self::whereIsOld(false);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
}
