<?php

namespace App\Eloquents\Logs;

use Illuminate\Database\Eloquent\Model;
use App\Eloquents\User;

/**
 * App\Eloquents\Logs\WebsiteVisitLog
 *
 * @property int $id
 * @property int|null $user_id
 * @property string $uri_path
 * @property string $ip
 * @property string|null $user_agent
 * @property string|null $http_referer
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property-read \App\Eloquents\User|null $user
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\WebsiteVisitLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\WebsiteVisitLog whereHttpReferer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\WebsiteVisitLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\WebsiteVisitLog whereIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\WebsiteVisitLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\WebsiteVisitLog whereUriPath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\WebsiteVisitLog whereUserAgent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Eloquents\Logs\WebsiteVisitLog whereUserId($value)
 * @mixin \Eloquent
 */
class WebsiteVisitLog extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
