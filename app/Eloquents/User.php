<?php

namespace App\Eloquents;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

/**
 * App\Eloquents\User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string|null $remember_token
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property string|null $auth_type
 * @property string|null $social_data
 * @property int|null $user_group
 * @property int|null $banned
 * @property int|null $allow_mail
 * @property string|null $info
 * @property string|null $foto
 * @property string|null $fullname
 * @property string|null $land
 * @property string|null $favorites
 * @property string|null $hash
 * @property string|null $logged_ip
 * @property int $is_old
 * @property int|null $requested_removing
 * @property int|null $requested_removing_user
 * @property int|null $requested_adding
 * @property int|null $requested_adding_user
 * @property int $is_muted
 * @property string|null $muted_date
 * @property int|null $mute_expires_in
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquents\PostComment[] $comments
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquents\Article[] $favoriteArticles
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquents\FavoritePost[] $favoritePosts
 * @property-read mixed $muted
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Eloquents\PostVote[] $votes
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereAllowMail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereAuthType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereBanned($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereFavorites($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereFoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereFullname($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereHash($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereInfo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereIsMuted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereIsOld($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereLand($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereLoggedIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereMuteExpiresIn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereMutedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereRequestedAdding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereRequestedAddingUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereRequestedRemoving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereRequestedRemovingUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereSocialData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\User whereUserGroup($value)
 * @mixin \Eloquent
 */
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function favoriteArticles()
    {
        return $this->belongsToMany(Article::class, 'favorite_articles');
    }

    public function favoritePosts()
    {
        return $this->hasMany('App\Eloquents\FavoritePost');
    }

    public function getSocialDataAttribute($rawValue)
    {
        return json_decode($rawValue);
    }

    public function setSocialDataAttribute($rawValue)
    {
        return $this->attributes['social_data'] = json_encode($rawValue);
    }

    public function log(string $message)
    {
        Log::info("User ({$this->id}, '{$this->name}'): {$message}");
    }

    public function votes()
    {
        return $this->hasMany(PostVote::class);
    }

    public function voteForPost(Post $post, int $vote)
    {
        return PostVote::create([
            'user_id' => $this->id,
            'post_id' => $post->id,
            'vote' => $vote,
        ]);
    }

    public function disableAllVotesForPost(Post $post)
    {
        $this->votes()->wherePostId($post->id)->update([
            'is_old' => 1,
        ]);
    }

    public function comments()
    {
        return $this->hasMany(PostComment::class);
    }

    public function getMutedAttribute()
    {
        if (!$this->is_muted) {
            // he's not muted
            return false;
        }
        if (!$this->mute_expires_in) {
            // he muted for all time - without expiration date
            return true;
        }
        // mute_expires_in is minutes
        return $this->mute_expires_in * 60 + $this->muted_date->timestamp > time();
    }

    /**
     * Mutes user
     *
     * @param int $minutes If null or 0 - user will be muted to ALL time without expiration date
     * @return void
     */
    public function mute(int $minutes = null)
    {
        $this->is_muted = true;
        $this->muted_date = Carbon::now();
        $this->mute_expires_in = $minutes ? : null;
        $this->save();
    }

    /**
     * Unmutes user
     *
     * @param int $minutes
     * @return void
     */
    public function unmute()
    {
        $this->is_muted = false;
        $this->muted_date = null;
        $this->mute_expires_in = null;
        $this->save();
    }
}
