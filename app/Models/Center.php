<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Center extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'regional_id'];

    // Relación con regional
    public function regional()
    {
        return $this->belongsTo(Regional::class);
    }

    // Relación con eventos
    public function events()
    {
        return $this->hasMany(Event::class);
    }
}
