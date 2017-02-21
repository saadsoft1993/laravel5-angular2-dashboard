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

        $this->validate($request, [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4|confirmed',
        ]);

        User::create($request->all());
    }
}
