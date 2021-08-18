<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\TeamMember
 *
 * @property int $id
 * @property string $name
 * @property string $roles
 * @property string $links
 * @property string $image_uri
 * @property int $order
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TeamMember whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TeamMember whereImageUri($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TeamMember whereLinks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TeamMember whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TeamMember whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\TeamMember whereRoles($value)
 * @mixin \Eloquent
 */
class TeamMember extends Model
{
    protected $hidden = [
        'id', 'order'
    ];
}
