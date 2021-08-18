<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AdminEventService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\UserExistsRequest;
use App\Eloquents\User;
use App\Eloquents\Admin_page;
use App\Eloquents\Admin_tutorial;

class AdminController extends Controller
{
    public function getMenu()
    {
        return Admin_page::where('rights', '>=', Auth::user()->user_group)->get();
    }

    public function getTutorials()
    {
        return Admin_tutorial::get();
    }

    public function muteUser(UserExistsRequest $request, $minutes)
    {
        $admin = Auth::user();
        $user = User::find($request->user_id);
        $service = new AdminEventService($admin);
        $service->muteUser($user, $minutes);
        return response()->json($user, 200);
    }

    public function unmuteUser(UserExistsRequest $request)
    {
        $admin = Auth::user();
        $user = User::find($request->user_id);
        $service = new AdminEventService($admin);
        $service->unmuteUser($user);
        return response()->json($user, 200);
    }
}
