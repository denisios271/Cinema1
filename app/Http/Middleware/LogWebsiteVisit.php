<?php

namespace App\Http\Middleware;

use Closure;
use App\Eloquents\Logs\WebsiteVisitLog;
use Illuminate\Support\Facades\Auth;

class LogWebsiteVisit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $log = new WebsiteVisitLog;
        $log->user_id = Auth::id();
        $log->uri_path = $request->path();
        $log->ip = $request->ip();
        $log->user_agent = $request->userAgent();
        $log->http_referer = $request->server('HTTP_REFERER');
        $log->save();

        return $next($request);
    }
}
