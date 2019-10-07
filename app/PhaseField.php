<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class PhaseField extends Model
{
    protected $fillable = ['phase_id','field_type','label','field_options','due_date','postpone'];

    protected $hidden = ['phase_id'];

    public function phase(){
        return $this->belongsTo("App\Phase");
    }

    public function cardFieldsValue(){
        return $this->belongsToMany('App\Card','card_phase_field','phase_field_id','card_id')
            ->withPivot(['value'])->withTimestamps();
    }

    public function cardLogs(){
        return $this->hasMany('App\CardLog');
    }

    public function setFieldOptionsAttribute($value){
        $this->attributes['field_options'] =  json_encode($value);        
    }

    public function getFieldOptionsAttribute($value){
        return json_decode($value,1);
    }
    public function getDueDateAttribute($value){
        if($this->attributes['postpone']){
            return Carbon::createFromDate(null,null,$value,'America/Sao_Paulo')->currentOrNextBusinessDay();
        }
        return Carbon::createFromDate(null,null,$value,'America/Sao_Paulo')->currentOrPreviousBusinessDay();
    }
    public function setDueDateAttribute($value){
        return Carbon::createFromFormat('Y-m-d\TH:i:s.uZ',$value)->day;
    }
    public function recurrentCardsFields(){
        return $this->hasMany('App\RecurrentCardField');
    }
}
