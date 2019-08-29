<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    //
    protected $fillable = ['name','cnpj','contact_email'];
 
    public function recurrentCards(){
        return $this->hasMany('App\RecurrentCard');
    }

    public function cards(){
        return $this->hasMany('App\Card');
    }
}
