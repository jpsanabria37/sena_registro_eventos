<?php

namespace Database\Seeders;

use App\Models\Attendee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Attendee::create([
            'name' => 'Juan Pablo',
            'email' => 'admin@admin.com',
            'document_type' => 'Cédula',
            'document_number' => '1018418073',
            'password' => Hash::make('admin'),
            'role' => 'admin', // Aquí le asignamos el rol de admin
        ]);

    }
}
