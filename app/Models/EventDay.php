<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventDay extends Model
{
    use HasFactory;

    protected $fillable = ['event_id', 'event_day', 'uuid', 'qr_code'];

    // Relación con el evento
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    // Relación con los asistentes (pivot para registrar asistencia por día)
    public function attendees()
    {
        return $this->belongsToMany(Attendee::class, 'attendee_event_day')
            ->withPivot('attendance_confirmed')
            ->withTimestamps();
    }
}
