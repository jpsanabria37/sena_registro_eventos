<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('attendee_event_day', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attendee_id')->constrained()->onDelete('cascade');  // Relación con los asistentes
            $table->foreignId('event_day_id')->constrained()->onDelete('cascade');  // Relación con los días del evento
            $table->boolean('attendance_confirmed')->default(false);  // Si el asistente confirmó su asistencia para este día
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendee_event_day');
    }
};
