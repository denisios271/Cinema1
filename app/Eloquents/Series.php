<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Series
 *
 * @property int $id
 * @property int $post_id
 * @property string $name
 * @property int $type_id
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property int|null $requested_removing
 * @property int|null $requested_removing_user
 * @property int|null $requested_adding
 * @property int|null $requested_adding_user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Series_content[] $players
 * @property-read \App\Post $post
 * @property-read \App\Type $type
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series whereRequestedAdding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series whereRequestedAddingUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series whereRequestedRemoving($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series whereRequestedRemovingUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series whereTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Series extends Model
{
    public function players()
    {
        return $this->hasMany('App\Eloquents\Series_content', 'seria_id');
    }

    public function type()
    {
        return $this->belongsTo('App\Eloquents\Type');
    }

    public function post()
    {
        return $this->belongsTo('App\Eloquents\Post');
    }
}
