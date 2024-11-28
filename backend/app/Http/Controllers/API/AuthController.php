<?php

namespace App\Http\Controllers\API;

use App\Models\User;
use App\Models\Candidate;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Employer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
//use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');
        $token = Auth::attempt($credentials);

        $user = Auth::user();

        if (!$token || $user->role !== $request->role) { //check token và role của user
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        if ($request->role == 1) {
            $name = User::join('candidates', 'users.id', '=', 'user_id')
                ->where('users.id', $user->id)
                ->select('firstname', 'lastname')
                ->first();
            // dd($name->firstname);
            $user['name'] = $name;
        }

        return response()->json([
            'user' => $user,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            // 'firstname' => 'required|string|max:100',
            // 'lastname' => 'required|string|max:100',
            'email' => 'email|max:255|unique:users',
            // 'password' => 'required|string|min:6',
        ]);

        User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 1,
            'is_active' => 1
        ]);

        $user = User::orderBy('id', 'desc')->first();
        Candidate::create([
            'id' => $user->id,
            'user_id' => $user->id,
            'firstname' => $request->firstname,
            'lastname' => $request->lastname,
            'email' => $request->email
        ]);

        // $credentials = $request->only('email', 'password');
        // $token = Auth::attempt($credentials);
        // if ($user->role == 1) {
        //     $user['name'] = [
        //         'firstname' => $request->firstname,
        //         'lastname' => $request->lastname
        //     ];
        // }

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user,
            // 'authorization' => [
            //     'token' => $token,
            //     'type' => 'bearer',
            // ]
        ], 201);
    }

    public function me()
    {
        $user = Auth::user();
        if ($user->role == 2) {
            $user = User::with('employer')->find($user->id);
        }
        if ($user->role == 1) {
            $name = User::join('candidates', 'users.id', '=', 'user_id')
                ->where('users.id', $user->id)
                ->select('firstname', 'lastname')
                ->first();
            $user['name'] = $name;
        }
        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 401);
        }

        return response()->json($user);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorization' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
    public function registerEmployer(Request $request)
{
    $request->validate([
        'email' => 'required|email|max:255|unique:users',
        'password' => 'required|string|min:6',
        'name' => 'required|string|max:255',
        'address' => 'required|string',
        'phone' => 'required|string',
        'website' => 'nullable|string|max:255',
    ]);

    $user = User::create([
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role' => 2, // Role nhà tuyển dụng
        'is_active' => 1,
    ]);

    Employer::create([
        'user_id' => $user->id,
        'name' => $request->name,
        'address' => $request->address,
        'phone' => $request->phone,
        'website' => $request->website,
    ]);

    return response()->json([
        'message' => 'Nhà tuyển dụng được tạo thành công',
    ], 201);
}

}
