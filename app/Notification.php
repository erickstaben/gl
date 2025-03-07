<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    //
    protected $fillable = ['user_id','content','title','event'];

    protected $hidden = ['user_id'];

    public function user(){
        return $this->belongsTo('App\User');
    }
}
