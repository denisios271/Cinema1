<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Players
 *
 * @property int $id
 * @property string $title
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Players whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Players whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Players whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Players whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Players extends Model
{
    //
}
