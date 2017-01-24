<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\PasswordReset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use Response;

class ResetPasswordController extends Controller
{

    public function resetConfirmed(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'password' => 'required|min:4|confirmed',
            ]);

        if ($validator->fails()) {
            return Response::json(['errors' => $validator->messages()], 400);
        }

        $passordReset = PasswordReset::whereToken($request->token)
            ->first();

        if (!$passordReset) {
            return Response::json(['errors' => ['token' => ['The token is invalid, try again']]], 400);
        }

        $user = User::whereEmail($passordReset->email)->firstOrFail();
        $user->password = bcrypt($request->password);
        if($user->save()){
            PasswordReset::whereEmail($passordReset->email)->delete();
            return json_encode(['result' => true]);
        }

        return Response::json(['errors' => ['try_again' => ['The password is not changed, try again']]], 400);
    }
    
}
