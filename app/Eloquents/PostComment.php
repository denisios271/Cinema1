<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Eloquents\PostComment
 *
 * @property int $id
 * @property int $post_id
 * @property int $user_id
 * @property string $body
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Eloquents\Post $post
 * @property-read \App\Eloquents\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostComment whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostComment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostComment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostComment wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostComment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\PostComment whereUserId($value)
 * @mixin \Eloquent
 */
class PostComment extends Model
{
    protected $with = [
        'user',
    ];

    public function post()
    {
        return $this->belongsTo(Post::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
