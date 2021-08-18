<?php

namespace App\Eloquents\Logs;

use Illuminate\Database\Eloquent\Model;
use App\Eloquents\User;

/**
 * App\Eloquents\Logs\ApiRequestLog
 *
 * @property int $id
 * @property int|null $user_id
 * @property string $api_endpoint
 * @property string $http_method
 * @property string $params
 * @property string $ip
 * @property string|null $user_agent
 * @property string|null $http_referer
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Eloquents\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\ApiRequestLog whereApiEndpoint($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\ApiRequestLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\ApiRequestLog whereHttpMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\ApiRequestLog whereHttpReferer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\ApiRequestLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\ApiRequestLog whereIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\ApiRequestLog whereParams($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\ApiRequestLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\ApiRequestLog whereUserAgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\ApiRequestLog whereUserId($value)
 * @mixin \Eloquent
 */
class ApiRequestLog extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function setParamsAttribute($value)
    {
        $this->attributes['params'] = json_encode($value);
    }

    public function getParamsAttribute()
    {
        return json_decode($this->attributes['params']);
    }
}
