<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecurrentCardField extends Model
{
    //
    protected $fillable = ['recurrent_card_id','phase_field_id'];
 
    public function recurrentCard(){
        return $this->belongsTo('App\RecurrentCard');
    }

    public function phaseField(){
        return $this->belongsTo('App\PhaseField');

    }
}
