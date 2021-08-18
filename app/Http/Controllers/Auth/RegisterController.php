<?php

namespace App\Http\Controllers\Auth;

use App\Eloquents\User;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Auth\Events\Registered;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/home';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    public function register(Request $request)
    {
        // let's check all data!
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:4|max:30|regex:/^[A-Za-z0-9]+$/',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ], [
            'username.required' => 'Имя не может быть пустым.',
            'username.min' => 'Имя не может быть меньше 4 символов.',
            'username.max' => 'Имя не может быть больше 30 символов.',
            'username.regex' => 'Имя может состоять только из символов латинского алфавита и цифр (без пробелов).',

            'email.required' => 'Почта не может быть пустой.',
            'email.email' => 'Ваша почта не прошла нашу проверку.',
            'email.unique' => 'Пользователь с такой почтой уже существует.',

            'userpass.required' => 'Пароль не может быть пустым.',
            'userpass.min' => 'Пароль должен содержать минимум 6 символов.',
        ]);
        if ($validator->fails()) {
            $errors = $validator->errors();
            $allErrors = $errors->all();
            return response()->json([
                'error' => implode(' ', $allErrors),
            ], 400);
        }

        // okey, lets create new user row in DB
        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')),
        ]);
        
        // trigger about new user
        event(new Registered($user));

        \Auth::guard()->login($user);
        $token = \Auth::guard()->issue();
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => 60
        ]);
        // }
        // return response()->json(['message' => 'Произошла ошибка сервера.'], 500);
    }
}
