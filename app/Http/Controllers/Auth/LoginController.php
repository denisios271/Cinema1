<?php
namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Eloquents\User;
use App\Eloquents\Logs\AuthorizationLog;

class LoginController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api')->except(['login', 'refresh']);
    }

    /**
     * Get a JWT token via given credentials.
     *
     * @param  \Illuminate\Http\Request  $request
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $log = new AuthorizationLog;
        $log->user_id = null;
        $log->is_successfully = false;
        $log->email = $request->email;
        $log->ip = $request->ip();
        $log->user_agent = $request->userAgent();
        $log->http_referer = $request->server('HTTP_REFERER');

        if (!$request->has('email')) {
            $log->save();
            return response()->json([
                'error' => 'Почта не может быть пустой.',
            ], 400);
        }
        if (!$request->has('password')) {
            $log->save();
            return response()->json([
                'error' => 'Пароль не может быть пустым.',
            ], 400);
        }
        
        $credentials = $request->only('email', 'password');
        
        if ($user = User::where('email', $request->input('email'))->first()) {
            $log->user_id = $user->id;
        }

        if ($this->guard()->attempt($credentials)) {
            $log->is_successfully = true;
            $log->save();

            $token = $this->guard()->issue();
            return $this->respondWithToken($token);
        }

        // user not logged in - just save current log
        $log->save();

        if (!$user) {
            return response()->json([
                'error' => 'Не существует такого пользователя.',
            ], 404);
        }

        if ($user->is_old) {
            return response()->json([
                'error' => 'Ваш пароль устарел. Смените его через восстановление аккаунта.',
            ], 400);
        }

        return response()->json([
            'error' => 'Не найдено таких совпадений.',
        ], 401);
    }

    /**
     * Get the authenticated User
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json($this->guard()->user());
    }

    /**
     * Log the user out (Invalidate the token)
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $this->guard()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken($this->guard()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl')
        ]);
    }

    /**
     * Get the guard to be used during authentication.
     *
     * @return \Illuminate\Contracts\Auth\Guard
     */
    public function guard()
    {
        return Auth::guard();
    }
}
