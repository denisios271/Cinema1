<?php

namespace App\Http\Middleware;

use Closure;
use App\Eloquents\Redirect;

class RedirectIfExistRecord
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
        $redirect = Redirect::whereFrom('/' . $request->path())->first();
        if ($redirect) {
            return redirect($redirect->to, 301);
        }
        return $next($request);
    }
}
