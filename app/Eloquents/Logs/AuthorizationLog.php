<?php

namespace App\Eloquents\Logs;

use Illuminate\Database\Eloquent\Model;
use App\Eloquents\User;

/**
 * App\Eloquents\Logs\AuthorizationLog
 *
 * @property int $id
 * @property int|null $user_id
 * @property int $is_successfully
 * @property string|null $email
 * @property string $ip
 * @property string|null $user_agent
 * @property string|null $http_referer
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Eloquents\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\AuthorizationLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\AuthorizationLog whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\AuthorizationLog whereHttpReferer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\AuthorizationLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\AuthorizationLog whereIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\AuthorizationLog whereIsSuccessfully($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\AuthorizationLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\AuthorizationLog whereUserAgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\AuthorizationLog whereUserId($value)
 * @mixin \Eloquent
 */
class AuthorizationLog extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
