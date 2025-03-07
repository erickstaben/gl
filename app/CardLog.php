<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CardLog extends Model
{
    //
    protected $fillable = ['card_id','user_id','phase_id','new_phase_id','action','duration','phase_field_id'];

    public function card(){
        return $this->belongsTo('App\Card');
    }

    public function user(){
        return $this->belongsTo('App\User');
    }

    public function phaseField(){
        return $this->belongsTo('App\PhaseField');
    }
}
