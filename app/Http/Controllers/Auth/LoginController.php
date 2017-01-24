<?php

namespace App\Http\Controllers\Auth;

use Response;
use JWTAuth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:4',
        ]);
        if ($validator->fails()) {
            return Response::json((['errors' => $validator->messages()]), 400);
        }

        $credentials = $request->only('email', 'password');
        try {
            // verify the credentials and create a token for the user
            if (!$token = JWTAuth::attempt($credentials)) {
                return Response::json(['errors' => ['password' => ['Whoops, your password or email are incorrect']]], 400);
            }
        } catch (\JWTException $e) {
            return Response::json(json_encode('Could not create token'), 500);
        }

        return Response::json(['token' => $token]);
    }
}
