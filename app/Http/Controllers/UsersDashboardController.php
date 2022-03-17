<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Facades\Hash;

class UsersDashboardController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $users = User::get();

        return view(
            'layouts.users-dashboard',
            [
                'users' => $users
            ]
        );
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function addUser()
    {
        return view('forms.add-user');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function saveUser(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        if (!$validated) {
            return Response::create([
                'status' => 500,
                'reason' => 'invalid validation'
            ]);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

        $user->save();

        return redirect('/users', 302);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function deleteUser($id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return Response::create([
                'status' => 500,
                'reason' => 'no user found'
            ]);
        }

        try {
            $user->delete();
        } catch (\Exception $e) {
            return Response::create([
                'status' => 500,
                'reason' => $e->getMessage()
            ]);
        }

        return redirect('/users', 302);
    }
}
