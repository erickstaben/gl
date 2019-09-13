<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\SoftDeletes;

class Pipe extends Model
{
    //
    use SoftDeletes;

    protected $fillable = ['name','is_favorite'];
 
    public function recurrentCards(){
        return $this->hasMany('App\RecurrentCard');
    }

    public function phases(){
        return $this->hasMany('App\Phase');
    }

    public function users(){
        return $this->belongsToMany('App\User')->withPivot(['is_favorite']);
    }

    public function cards()
    {
        return $this->hasManyThrough(
            'App\Card', 'App\Phase',
            'pipe_id', 'phase_id'
        );
    }

    public function getTotalCardsAttribute()
    {
        return $this->hasManyThrough(
            'App\Card', 'App\Phase',
            'pipe_id', 'phase_id'
        )->count();
    }
}
