<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $fillable = ['agent','subject','type','description','card_id'];

    public function card(){
        return $this->belongsTo('App\Card');
    }
}
