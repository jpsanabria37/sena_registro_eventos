<?php

namespace Database\Seeders;

use App\Models\Center;
use App\Models\Regional;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CenterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Obtener las regionales
        $regional1 = Regional::where('name', 'Regional 1')->first();
        $regional2 = Regional::where('name', 'Regional 2')->first();

        // Crear tres centros para la primera regional
        Center::create(['name' => 'Centro 1 Regional 1', 'regional_id' => $regional1->id]);
        Center::create(['name' => 'Centro 2 Regional 1', 'regional_id' => $regional1->id]);
        Center::create(['name' => 'Centro 3 Regional 1', 'regional_id' => $regional1->id]);

        // Crear tres centros para la segunda regional
        Center::create(['name' => 'Centro 1 Regional 2', 'regional_id' => $regional2->id]);
        Center::create(['name' => 'Centro 2 Regional 2', 'regional_id' => $regional2->id]);
        Center::create(['name' => 'Centro 3 Regional 2', 'regional_id' => $regional2->id]);
    }
}
