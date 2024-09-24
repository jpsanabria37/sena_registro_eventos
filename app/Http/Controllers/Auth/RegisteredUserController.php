<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Attendee;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:attendees'], // Cambia 'users' por 'attendees'
            'document_type' => ['required', 'string', 'max:255'], // Validación para documento
            'document_number' => ['required', 'string', 'max:255', 'unique:attendees'],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $attendee = Attendee::create([
            'name' => $request->name,
            'email' => $request->email,
            'document_type' => $request->document_type, // Guardamos el tipo de documento
            'document_number' => $request->document_number, // Guardamos el número de documento
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($attendee));

        Auth::login($attendee);

        return redirect(RouteServiceProvider::HOME);
    }
}
