<?php

namespace App\Http\Controllers\Auth;

use Mail;
use App\PasswordReset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ForgotPasswordController extends Controller
{

    public function resetVerify(Request $request)
    {
        $this->validate($request, ['email' => 'required|email|max:255|min:3|exists:users,email']);
        $this->createResetToken($request->email);
    }

    private function createResetToken($email)
    {

        //invalidate old tokens
        PasswordReset::whereEmail($email)->delete();

        $reset = PasswordReset::create([
            'email' => $email,
            'token' => str_random(10),
        ]);
        Mail::send('auth.reset', ['token' => $reset->token], function ($mail) use ($email) {
            $mail->to($email)
                ->from('noreply@example.com')
                ->subject('Password reset link');
        });
    }
}
