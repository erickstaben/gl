<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RecurrentCardField extends Model
{
    //
    protected $fillable = ['name'];
 
    public function recurrentCard(){
        return $this->belongsTo('App\RecurrentCard');
    }
}
