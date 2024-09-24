<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttendeeEventDay extends Model
{
    use HasFactory;

    protected $table = 'attendee_event_day';

    protected $fillable = [
        'attendee_id',
        'event_day_id',
        'confirmed',
    ];

    // Relación con Attendee (Asistentes)
    public function attendee()
    {
        return $this->belongsTo(Attendee::class);
    }

    // Relación con EventDay (Días de los eventos)
    public function eventDay()
    {
        return $this->belongsTo(EventDay::class);
    }
}
