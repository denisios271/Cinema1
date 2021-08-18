<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Category
 *
 * @property int $id
 * @property int|null $parentid
 * @property string $name
 * @property string $alt_name
 * @property string|null $descr
 * @property string|null $keywords
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property int|null $requested_removing
 * @property int|null $requested_removing_user
 * @property int|null $requested_adding
 * @property int|null $requested_adding_user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\PostsCategories[] $posts
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereAltName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereDescr($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereKeywords($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereParentid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereRequestedAdding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereRequestedAddingUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereRequestedRemoving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereRequestedRemovingUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Category whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read mixed $parent
 */
class Category extends Model
{
    public function posts()
    {
        return $this->hasMany('App\Eloquents\PostsCategories');
    }

    public function getParentAttribute()
    {
        if (!$this->parentid) {
            return null;
        }
        return self::find($this->parentid);
    }
}
