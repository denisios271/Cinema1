<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\Response;

class RequiredUserRight
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $requiredRight)
    {
        if (!\Auth::user()) {
            return response()->json([
                'error' => 'Вы должны авторизоваться.',
            ], 401);
        }
        if (\Auth::user()->user_group > $requiredRight) {
            return response()->json([
                'error' => 'У вас нет прав.',
            ], 403);
        }
        config(['token' => $request->input('token', '')]);
        return $next($request);
    }
}
