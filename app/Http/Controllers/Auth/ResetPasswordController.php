<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\PasswordReset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ResetPasswordController extends Controller
{

    public function resetConfirmed(Request $request)
    {
        $this->validate($request, ['password' => 'required|min:4|confirmed']);

        $passwordReset = PasswordReset::whereToken($request->token)->first();
        if (!$passwordReset) {
            abort(404, 'Token not found');
        }

        $user = User::whereEmail($passwordReset->email)->firstOrFail();
        $user->password = bcrypt($request->password);
        if ($user->save()) {
            PasswordReset::whereEmail($passwordReset->email)->delete();
        } else {
            abort('The password is not changed, try again', 422);
        }
    }
}
