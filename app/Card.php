<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    //
    protected $fillable = ['due_date','title','company_id','phase_id','creator_id'];

    protected $hidden = ['company_id','phase_id','creator_id'];

    protected $with = ['assignedUsers','company','fields'];

    public function company(){
        return $this->belongsTo('App\Company');
    }

    public function phase(){
        return $this->belongsTo('App\Phase');
    }

    public function creator(){
        return $this->belongsTo('App\User','creator_id');
    }

    public function assignedUsers(){
        return $this->belongsToMany('App\User');
    }

    public function fields(){
        return $this->belongsToMany('App\PhaseField','card_phase_field','card_id','phase_field_id')
            ->withPivot(['value']);
    }

    public function cardEmails(){
        return $this->hasMany('App\CardEmail');
    }
    
}
