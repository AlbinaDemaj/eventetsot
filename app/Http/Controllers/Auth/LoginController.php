<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = '/user/home';

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->middleware('auth')->only('logout');
    }

    protected function redirectTo()
    {
        return '/user/home';
    }

    protected function authenticated(Request $request, $user)
    {
        $data = [
            'last_login_at' => now(),
        ];

        if (\Schema::hasColumn('users', 'last_login_ip')) {
            $data['last_login_ip'] = $request->ip();
        }

        $user->update($data);

        if ($user->is_admin ?? false) {
            return redirect('/admin/dashboard');
        }

        return redirect('/user/home');
    }
}