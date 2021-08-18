<?php

namespace App\Http\Controllers\Auth\SocialNetworks;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Eloquents\User;
use App\Eloquents\Logs\AuthorizationLog;

class SocialNetwork extends Controller
{
    /**
     * This is stored in DB table's field `auth_type` to check from what user logged in.
     *
     * @var string
     */
    protected $authType;

    /**
     * This is for subclasses.
     * Temporary var to store data from server (like vk's auth).
     *
     * @var mixed
     */
    protected $userData;

    /**
     * Returns username based on $this->userData;
     *
     * @return string
     */
    protected function getUsername($uid)
    {
        return $this->getUniqueId($uid);
    }

    /**
     * Returns unique identifier based on auth type & social network's id
     *
     * @param mixed $uid Unique social network's id
     * @return string
     */
    protected function getUniqueId($uid)
    {
        return "{$this->authType}-{$uid}";
    }

    /**
     * Save user into DataBase with generating token (only generating!)
     *
     * @param mixed $uid String or integer - unique identifier of social network
     * @return User Inserted result
     */
    public function saveUser($uid)
    {
        $email = $this->getUniqueId($uid);
        $name = $this->getUsername($uid);

        $newUser = new User();
        $newUser->email = $email;
        $newUser->name = $name;
        $newUser->password = sha1(md5($uid . $uid) . $this->authType . md5(rand(100, 999) . 'This is random pass'));
        $newUser->auth_type = $this->authType;
        $newUser->social_data = $this->userData;
        $newUser->save();
        
        return $newUser;
    }

    /**
     * Returns user from DataBase using social's identifier
     *
     * @param mixed $uid Str or int
     * @return User Array of user from database (keys == fields from table users)
     */
    public function getUser($uid)
    {
        $data = User::where('email', $this->getUniqueid($uid))->first();
        if ($data) {
            $data->social_data = $data->social_data;
        } else {
            $data = null;
        }
        return $data;
    }

    /**
     * Auths - set session
     * 1. Will check data
     * 2. Save user into DB if not stored already
     * 3. Create session
     *
     * @param mixed $data Social data
     * @return array [ string, integer ] Where string - message what happened, integer - http status code
     */
    public function auth(Request $request)
    {
        $log = new AuthorizationLog;
        $log->user_id = null;
        $log->is_successfully = false;
        $log->email = null;
        $log->ip = $request->ip();
        $log->user_agent = $request->userAgent();
        $log->http_referer = $request->server('HTTP_REFERER');

        $data = $request->input('data', []);
        $this->convertUserData($data);

        // is data correct?
        if (!$this->check()) {
            $log->save();
            return response()->json([
                'error' => 'Некорректные данные',
            ], 400);
        }

        // okey, data is correct, let's get user from DataBase or save them
        $socialId = $this->getUserSocialId();
        $user = $this->getUser($socialId);
        if (!$user) {
            // user not exists in db!
            // let's save them!
            $user = $this->saveUser($socialId);
        }

        $log->user_id = $user->id;
        $log->email = $user->email;

        \Auth::guard()->login($user);
        $token = \Auth::guard()->issue();

        if ($token) {
            $log->is_successfully = true;
            $log->save();
            return response()->json([
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => 60,
            ], 200);
        } else {
            $log->save();
            return response()->json([
                'error' => 'Произошла ошибка сервера.',
            ], 500);
        }
    }

    /**
     * Converting data for storing inside class in protected var
     *
     * @param mixed $data Social data
     * @return void
     */
    protected function convertUserData($data)
    {
        $this->userData = $data;
    }

    /**
     * Is data correct?
     *
     * @param mixed $data Data from social network
     * @return bool true or false
     */
    protected function check()
    {
    }

    /**
     * Return unique user identifier by social network
     *
     * @param [type] $data
     * @return void
     */
    protected function getUserSocialId()
    {
    }
}
