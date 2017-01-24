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

        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4|confirmed',
        ]);

        if ($validator->fails()) {
            return Response::json(['errors' => $validator->messages()], 400);
        }

        $user = new User;
        $user->name = trim($request->name);
        $user->email = trim(strtolower($request->email));
        $user->password = bcrypt($request->password);
        $user->save();

        return Response::json(['result' => true]);
    }
}
