<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;
use App\Traits\Requestable;

/**
 * App\Eloquents\Article
 *
 * @property int $id
 * @property int $user_id
 * @property string $title
 * @property string $uri
 * @property string $hashtags
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property int|null $requested_removing
 * @property int|null $requested_removing_user
 * @property int|null $requests
 * @property string $content
 * @property int|null $requested_adding
 * @property int|null $requested_adding_user
 * @property-read mixed $short_content
 * @property-read \App\Eloquents\User $publisher
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereHashtags($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereRequestedAdding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereRequestedAddingUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereRequestedRemoving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereRequestedRemovingUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereRequests($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereUri($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Article whereUserId($value)
 * @mixin \Eloquent
 */
class Article extends Model
{
    use Requestable;

    protected $with = [
        'publisher',
    ];

    protected $appends = [
        'short_content',
    ];

    public function publisher()
    {
        return $this->belongsTo('App\Eloquents\User', 'user_id');
    }

    /**
     * Value can be string or array of string
     * But we want to convert it into string with ', ' delimiter symbols
     *
     * @param string|array $value
     * @return void
     */
    public function setHashtagsAttribute($value)
    {
        if (is_array($value)) {
            $value = implode(", ", $value);
        }
        $this->attributes['hashtags'] = $value;
    }

    public function addToFavorite(User $user): FavoriteArticle
    {
        $user->favoriteArticles()->attach($this->id);
    }

    public function removeFromFavorite(User $user): bool
    {
        $user->favoriteArticles()->detach($this->id);
    }

    /**
     * We have to use mb_convert_encoding here. See link below for more details.
     * @see https://stackoverflow.com/questions/46305169/php-json-encode-malformed-utf-8-characters-possibly-incorrectly-encoded
     */
    public function getShortContentAttribute()
    {
        return mb_convert_encoding(substr(strip_tags($this->content), 0, 300) . '...', 'UTF-8', 'UTF-8');
    }
}
