<?php

namespace App\Eloquents;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Series_content
 *
 * @property int $id
 * @property int $seria_id
 * @property int $player_id
 * @property string $url
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Players $player
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series_content whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series_content whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series_content wherePlayerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series_content whereSeriaId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series_content whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Series_content whereUrl($value)
 * @mixin \Eloquent
 */
class Series_content extends Model
{
    public function player()
    {
        return $this->belongsTo('App\Eloquents\Players');
    }
}
