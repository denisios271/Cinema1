<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\Response;
use App\Vk\Helper\Token;

class VkAccessToken
{
    /**
     * Handle an incoming request.
     *
     * @see https://vk.com/dev/auth_sites
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if ($request->has('error')) {
            // just stop execution and show error
            echo $request->error_description;
            return;
        }
        if ($request->has('code')) {
            // we have code, now we can get acces_token and dpn't need it
            return $next($request);
        }
        // we have no access token, have no code & have no error...
        // so, mb we need to get 'code' now?
        return Token::createRedirectToGetCode($request);
    }
}
