<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\PostsCategories
 *
 * @property int $id
 * @property int $post_id
 * @property int $category_id
 * @property-read \App\Category $category
 * @property-read \App\Post $post
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostsCategories whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostsCategories whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\PostsCategories wherePostId($value)
 * @mixin \Eloquent
 */
class PostsCategories extends Model
{
    public $timestamps = false;
    
    public function post()
    {
        return $this->belongsTo('App\Eloquents\Post');
    }

    public function category()
    {
        return $this->belongsTo('App\Eloquents\Category');
    }
}
