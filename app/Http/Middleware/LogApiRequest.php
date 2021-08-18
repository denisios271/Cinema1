<?php

namespace App\Http\Middleware;

use Closure;
use App\Eloquents\Logs\ApiRequestLog;
use Illuminate\Support\Facades\Auth;

class LogApiRequest
{
    protected $ignorePaths = [
        "/^(api\/auth\/login)$/i",
        "/^(api\/auth\/refresh)$/i",
        "/^(api\/auth\/me)$/i",
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->method() == 'GET') {
            return $next($request);
        }
        foreach ($this->ignorePaths as $ignorePath) {
            if (preg_match($ignorePath, $request->path())) {
                return $next($request);
            }
        }
        $log = new ApiRequestLog;
        $log->user_id = Auth::id(); // will be null if user is not authorized
        $log->api_endpoint = $request->path();
        $log->http_method = $request->method();
        $log->params = $request->all();
        $log->ip = $request->ip();
        $log->user_agent = $request->userAgent();
        $log->http_referer = $request->server('HTTP_REFERER');
        $log->save();

        return $next($request);
    }
}
