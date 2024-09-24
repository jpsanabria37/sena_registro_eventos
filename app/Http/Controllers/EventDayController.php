<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\EventDay;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventDayController extends Controller
{
    //
    public function create(Event $event)
    {
        // Usamos Inertia para renderizar el componente de React
        return Inertia::render('EventDays/Create', [
            'event' => $event,
        ]);
    }

    public function store(Request $request, Event $event)
    {
        $request->validate([
            'event_day' => 'required|date',
        ]);

        $event->days()->create([
            'event_day' => $request->event_day,
        ]);

        return redirect()->route('events.show', $event->id)->with('success', 'Día del evento creado correctamente.');
    }

    // Confirmar asistencia mediante QR
    public function confirmDayAttendance($uuid)
    {
        // Buscar el día del evento por UUID
        $eventDay = EventDay::where('uuid', $uuid)->firstOrFail();

        // Lógica para confirmar la asistencia
        $attendee = auth()->user(); // Asistente autenticado

        // Verificar si el asistente está registrado en el evento
        if ($eventDay->event->attendees()->where('attendee_id', $attendee->id)->exists()) {
            // Confirmar la asistencia para este día
            $eventDay->attendees()->attach($attendee->id, ['attendance_confirmed' => true]);

            return redirect()->route('events.show', $eventDay->event_id)->with('success', 'Asistencia confirmada para el día ' . $eventDay->event_day);
        }

        return redirect()->route('events.show', $eventDay->event_id)->with('error', 'No estás registrado para este evento.');
    }
}
