<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


Route::group(
    [
        'prefix' => 'v1',
//        'middleware' => 'auth'
    ],
    function () {
        Route::post('auth', function (Request $request) {
//            sleep(2);

            if ($request->json('username') == 'admin@site.com' && $request->json('password') == 'admin') {
                return json_encode(['token' => str_random(32)]);
            }

            return json_encode(false);
//            return json_encode(['password' => ['Whoops, your password or email are incorrect']]);
        });
    }
);