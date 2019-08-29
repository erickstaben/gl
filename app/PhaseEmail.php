<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PhaseEmail extends Model
{
    protected $fillable = ['phase_id','send_type','copy','to','subject','content'];

    protected $hidden = ['phase_id'];

    public function cardEmails(){
        return $this->hasMany("App\CardEmail");
    }

    public function phase(){
        return $this->belongsTo('App\Phase');
    }
}
