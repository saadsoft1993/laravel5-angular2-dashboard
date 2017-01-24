<?php

namespace App\Http\Controllers\Auth;

use Mail;
use App\User;
use App\PasswordReset;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Validator;
use Response;

class ForgotPasswordController extends Controller
{

    public function resetVerify(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|email|max:255|min:3',
            ]
        );
        if ($validator->fails()) {
            return Response::json(['errors' => $validator->messages()], 400);
        }

        $user = User::whereEmail($request->email)->first();
        if (!$user) {
            return Response::json(['errors' => ['email' => ['Email was not found in the system']]], 400);
        }

        $this->createResetToken($request->email);

        return Response::json(['result' => true]);
    }

    private function createResetToken($email)
    {

        //invalidate old tokens
        PasswordReset::whereEmail($email)->delete();

        $reset = PasswordReset::create([
            'email' => $email,
            'token' => str_random(10),
        ]);
        if(is_object($reset)) {
            Mail::send('auth.reset', ['token' => $reset->token], function ($mail) use ($email) {
                $mail->to($email)
                    ->from('noreply@example.com')
                    ->subject('Password reset link');
            });
        }

    }
}
