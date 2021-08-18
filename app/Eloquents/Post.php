<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

/**
 * App\Eloquents\Post
 *
 * @property int $id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property \App\Eloquents\User $publisher
 * @property string $full_story
 * @property string $title
 * @property string|null $keywords
 * @property string $alt_name
 * @property string|null $tags
 * @property string|null $poster
 * @property string|null $trailer
 * @property string|null $voicers
 * @property string|null $translaters
 * @property string|null $timers
 * @property int|null $requested_removing
 * @property int|null $requested_removing_user
 * @property int|null $requests
 * @property int|null $requested_adding
 * @property int|null $requested_adding_user
 * @property int $has_public_access
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquents\PostsCategories[] $categories
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquents\PostComment[] $comments
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquents\Series[] $series
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquents\PostVote[] $votes
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereAltName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereFullStory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereHasPublicAccess($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereKeywords($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post wherePoster($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post wherePublisher($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereRequestedAdding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereRequestedAddingUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereRequestedRemoving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereRequestedRemovingUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereRequests($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereTags($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereTimers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereTrailer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereTranslaters($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Post whereVoicers($value)
 * @mixin \Eloquent
 */
class Post extends Model
{
    public static function groupByYears()
    {
        return self::get()->groupBy(function (Post $v) {
            return Carbon::parse($v->created_at)->format('Y');
        });
    }

    public function publisher()
    {
        return $this->belongsTo('App\Eloquents\User', 'user_id');
    }

    public function series()
    {
        return $this->hasMany('App\Eloquents\Series');
    }

    public function categories()
    {
        return $this->hasMany('App\Eloquents\PostsCategories');
    }

    public function votes()
    {
        return $this->hasMany(PostVote::class);
    }

    public function comments()
    {
        return $this->hasMany(PostComment::class);
    }
}
