<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $fillable = ['title','description','card_id'];

    public function card(){
        return $this->belongsTo('App\Card');
    }
}
