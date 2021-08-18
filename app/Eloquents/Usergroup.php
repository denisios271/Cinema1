<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Usergroup
 *
 * @property int $id
 * @property string $group_name
 * @property string $icon
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Usergroup whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Usergroup whereGroupName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Usergroup whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Usergroup whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Usergroup whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Usergroup extends Model
{
    //
}
