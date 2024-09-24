<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Attendee extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'document_type',
        'document_number',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Relación con eventos (a través de la tabla pivot event_attendee)
    public function events()
    {
        return $this->belongsToMany(Event::class, 'event_attendee')
            ->withPivot('role', 'attendance_confirmed')
            ->withTimestamps();
    }

    public function eventDays()
    {
        return $this->belongsToMany(EventDay::class, 'attendee_event_day')
            ->withPivot('attendance_confirmed')
            ->withTimestamps();
    }
}
