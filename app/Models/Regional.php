<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Regional extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    // Relación con centros de formación
    public function centers()
    {
        return $this->hasMany(Center::class);
    }
}
