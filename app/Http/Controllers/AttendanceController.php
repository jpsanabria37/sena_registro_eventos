<?php

namespace App\Http\Controllers;

use App\Models\AttendeeEventDay;
use App\Models\EventDay;
use Illuminate\Http\Request;

class AttendanceController extends Controller
{
    public function confirm(Request $request, $eventDayId)
    {
        $request->validate([
            'qr_photo' => 'required|image|max:2048', // Validamos que haya una imagen
        ]);

        // Aquí iría la lógica para verificar la imagen QR o simplemente registrar la asistencia
        // Vamos a suponer que si la imagen es cargada, la asistencia se confirma

        AttendeeEventDay::create([
            'attendee_id' => auth()->user()->id,
            'event_day_id' => $eventDayId,
            'confirmed' => true,
        ]);

        return redirect()->back()->with('success', 'Asistencia confirmada para el día.');
    }

    public function downloadCertificate($eventId)
    {
        // Obtener los días del evento
        $eventDays = EventDay::where('event_id', $eventId)->get();

        // Verificar si el usuario ha asistido a todos los días
        $attendedDays = AttendeeEventDay::where('attendee_id', auth()->user()->id)
            ->whereIn('event_day_id', $eventDays->pluck('id'))
            ->where('confirmed', true)
            ->count();

        if ($attendedDays == $eventDays->count()) {
            // El usuario ha asistido a todos los días, permitir la descarga del certificado
            return response()->download('path-to-certificado.pdf');
        }

        return redirect()->back()->with('error', 'Debes asistir a todos los días para descargar el certificado.');
    }
}
