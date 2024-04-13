<?php

namespace App\Http\Controllers\Profile;

use App\Http\Requests\Profile\ProfileUpdateRequest;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Profile\ProfileDestroyRequest;

class ProfileController extends Controller
{
    public function index()
    {
        return Auth::user();
    }

    public function update(ProfileUpdateRequest $request)
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return response()->noContent();
    }

    public function destroy(ProfileDestroyRequest $request)
    {
        $user = $request->user();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
