<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Phase extends Model
{
    //
    protected $fillable = ['pipe_id','name','is_final','order','description','client_status'];

    protected $hidden = ['pipe_id'];

    public function phaseEmails(){
        return $this->hasMany("App\PhaseEmail");
    }

    public function cards(){
        return $this->hasMany('App\Card');
    }

    public function phaseFields(){
        return $this->hasMany('App\PhaseField');
    }

    public function pipe(){
        return $this->belongsTo('App\Pipe');
    }
}
