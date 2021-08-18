<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Admin_page
 *
 * @property int $id
 * @property string $title
 * @property string $uri
 * @property int $rights
 * @property int|null $parent_id
 * @property int|null $is_hidden
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Admin_page whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Admin_page whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Admin_page whereIsHidden($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Admin_page whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Admin_page whereRights($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Admin_page whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Admin_page whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Admin_page whereUri($value)
 * @mixin \Eloquent
 */
class Admin_page extends Model
{
    //
}
