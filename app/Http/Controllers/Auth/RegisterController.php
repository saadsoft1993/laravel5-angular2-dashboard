<?php

namespace App\Http\Controllers\Auth;

use Response;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class RegisterController extends Controller
{
    public function register(Request $request)
    {

        $this->validate($request, User::VALIDATION_RULES);

        User::create($request->all());
    }
}
