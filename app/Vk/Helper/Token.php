<?php

namespace App\Vk\Helper;

use App\Eloquents\Series;
use App\Eloquents\Series_content;
use Illuminate\Http\Request;

class Token
{
    public static function getUserAccessTokenByCode(Request $request)
    {
        $cid = config('vk.app.id');
        $csecret = config('vk.app.secret');
        $uri = explode('?', $request->getUri())[0];
        return json_decode(file_get_contents("https://oauth.vk.com/access_token?client_id={$cid}&client_secret={$csecret}&code={$request->code}&redirect_uri={$uri}"));
    }

    public static function createRedirectToGetCode(Request $request)
    {
        $permissions = 4 + 8192; // 4 - photos, 8192 - wall
        $cid = config('vk.app.id');
        $v = config('vk.api.version');
        $uri = explode('?', $request->getUri())[0];

        if ($request->has('error')) {
            // just stop execution
            echo $request->error_description;
            return;
        }
        if ($request->has('code')) {
            // we have code, now we can get acces_token and dpn't need it
            return $next($request);
        }
        // we have no access token, have no code & have no error...
        // so, mb we need to get 'code' now?
        return redirect("https://oauth.vk.com/authorize?client_id={$cid}&scope={$permissions}&redirect_uri={$uri}&response_type=code&v={$v}");
    }
}
