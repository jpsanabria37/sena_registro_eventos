<?php

namespace App\Http\Controllers;

use App\Models\Center;
use App\Models\Event;
use App\Models\EventDay;
use Illuminate\Http\Request;
use Carbon\Carbon; // Para manejo de fechas
use Illuminate\Support\Str; // Para generar UUIDs
use Inertia\Inertia;

use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel\ErrorCorrectionLevelLow;
use Endroid\QrCode\Writer\PngWriter;


class EventController extends Controller
{
    public function index()
    {
        // Obtener todos los eventos
        $events = Event::all();

        // Renderizar la vista de React y pasar los eventos
        return Inertia::render('Events/Index', [
            'events' => $events,
        ]);
    }

    public function create()
    {
        $centers = Center::all();  // Obtener los centros disponibles
        return Inertia::render('Events/Create', [
            'centers' => $centers,
        ]);
    }
    //
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'center_id' => 'required|exists:centers,id',
        ]);

        // Crear el evento
        $event = Event::create($request->all());

        // Calcular los días del evento
        $startDate = Carbon::parse($request->start_date);
        $endDate = Carbon::parse($request->end_date);

        for ($date = $startDate; $date->lte($endDate); $date->addDay()) {
            $uuid = Str::uuid();  // Generar un UUID para el día del evento

            // Crear el día del evento
            $eventDay = EventDay::create([
                'event_id' => $event->id,
                'event_day' => $date->format('Y-m-d'),
                'uuid' => $uuid,
            ]);

            // Generar la URL única con el UUID
            $qrCodeUrl = route('confirm.day.attendance', ['uuid' => $uuid]);

            // Usar endroid/qr-code para generar el código QR
            $result = Builder::create()
                ->writer(new PngWriter())       // Usar PNG como formato de salida
                ->data($qrCodeUrl)              // La URL a codificar en el QR
                ->encoding(new Encoding('UTF-8')) // Codificación UTF-8
                ->errorCorrectionLevel(new ErrorCorrectionLevelLow()) // Nivel de corrección de errores bajo
                ->size(300)                     // Tamaño del QR en píxeles
                ->build();

            // Convertir el QR a base64
            $qrCodeBase64 = base64_encode($result->getString());

            // Guardar el código QR en la base de datos
            $eventDay->qr_code = $qrCodeBase64;
            $eventDay->save();
        }

        return redirect()->route('events.index')->with('success', 'Evento y días creados con códigos QR.');
    }

    public function show($id)
    {
        $event = Event::findOrFail($id);
        $eventDays = EventDay::where('event_id', $id)->get(); // Obtener los días del evento

        return Inertia::render('Events/Show', [
            'event' => $event,
            'eventDays' => $eventDays,
            'auth' => [
                'user' => auth()->user(),
            ],
        ]);
    }
}
