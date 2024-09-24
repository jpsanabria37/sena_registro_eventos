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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');  // Nombre del evento
            $table->text('description')->nullable();  // Descripción del evento
            $table->date('start_date')->nullable();  // Fecha de inicio del evento
            $table->date('end_date')->nullable();  // Fecha de fin del evento
            $table->foreignId('center_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
