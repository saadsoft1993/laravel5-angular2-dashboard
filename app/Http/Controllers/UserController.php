<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        return User::orderBy($request->get('orderBy', 'id'), $request->get('orderDir', 'desc'))
            ->search($request->get('query'))
            ->paginate($request->get('perPage', 10));
    }

    public function store(Request $request)
    {
        $this->validate($request, User::VALIDATION_RULES);
        User::create($request->all());
    }
}
