<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'start_date', 'end_date', 'qr_code', 'center_id'];

    // Relación con asistentes (a través de la tabla pivot event_attendee)
    public function attendees()
    {
        return $this->belongsToMany(Attendee::class, 'event_attendee')
            ->withPivot('role', 'attendance_confirmed')
            ->withTimestamps();
    }

    public function center()
    {
        return $this->belongsTo(Center::class);
    }

    public function days()
    {
        return $this->hasMany(EventDay::class);
    }
}
