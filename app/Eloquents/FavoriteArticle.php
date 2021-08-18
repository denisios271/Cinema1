<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\FavoriteArticle
 *
 * @property int $id
 * @property int $article_id
 * @property int $user_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Article $article
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FavoriteArticle whereArticleId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FavoriteArticle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FavoriteArticle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FavoriteArticle whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\FavoriteArticle whereUserId($value)
 * @mixin \Eloquent
 */
class FavoriteArticle extends Model
{
    protected $fillable = ['user_id', 'article_id'];

    public function user()
    {
        return $this->belongsTo('App\Eloquents\User');
    }

    public function article()
    {
        return $this->belongsTo('App\Eloquents\Article');
    }
}
