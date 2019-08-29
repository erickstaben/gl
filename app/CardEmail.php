<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CardEmail extends Model
{
    protected $fillable = ['card_id','status','subject','content','to','phase_email_id'];

    protected $hidden = ['phase_email_id','card_id'];

    public function phaseEmail(){
        return $this->belongsTo("App\PhaseEmail");
    }

    public function card(){
        return $this->belongsTo('App\Card');
    }
}
