<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PhaseField extends Model
{
    protected $fillable = ['phase_id','field_type','label','field_options'];

    protected $hidden = ['phase_id'];

    public function phase(){
        return $this->belongsTo("App\Phase");
    }

    public function cardFieldsValue(){
        return $this->belongsToMany('App\Card','card_phase_field','phase_field_id','card_id')
            ->withPivot(['value']);
    }

    public function setFieldOptionsAttribute($value){
        $this->attributes['field_options'] =  json_encode($value);        
    }

    public function getFieldOptionsAttribute($value){
        return json_decode($value,1);
    }
}
