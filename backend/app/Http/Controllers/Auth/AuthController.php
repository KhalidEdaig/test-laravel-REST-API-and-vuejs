<?php

namespace App\Http\Controllers\Auth;

use App\Enums\eRespCode;
use App\Http\Controllers\ResponseController;
use App\Http\Requests\Auth\changePasswordRequest;
use App\Http\Requests\Auth\LoginPostResquest;
use App\Http\Resources\User\UsersResources;
use App\Models\User;

class AuthController extends ResponseController
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    /* public function register(RegisterPostResquest $request)
    {

        //Request is valid, create new user
        $user = User::create($request->all());

        //User created, return success response
        return response()->json([
            'success' => true,
            'message' => 'User created successfully',
            'data' => $user
        ]);
    } */

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginPostResquest $request)
    {

        if (!$token = auth()->attempt($request->all())) {
            return $this->resp->guessResponse(eRespCode::_403_NOT_AUTHORIZED);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return $this->resp->ok(eRespCode::U_GET_200_03, new UsersResources(auth()->user()));
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'username' => auth()->user()->username,
            'email' => auth()->user()->email,
            'is_admin' => auth()->user()->hasRole('super_admin'),
            'roles' => auth()->user()->getRoleNames(),
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }

    public function changePassword(changePasswordRequest $request)
    {
        $user = User::find(auth()->user()->id);

        if (!Hash::check($request->old_password, $user->password))
            return $this->resp->guessResponse(eRespCode::_403_NOT_AUTHORIZED);

        $user->password = $request->password;

        if ($user->save())
            return $this->resp->ok(eRespCode::_200_OK);

        return $this->resp->guessResponse(eRespCode::_500_INTERNAL_ERROR);
    }
}
