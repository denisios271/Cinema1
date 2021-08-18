<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Eloquents\Type;
use App\Eloquents\Players;

class SeriesInformationController extends Controller
{
    public function all(): array
    {
        return [
            'types' => Type::get(),
            'players' => Players::get(),
        ];
    }
}
