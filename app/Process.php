<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    protected $fillable = ['company_id','user_id','name'];

    public function activities(){
        return $this->hasMany('App\Activity');
    }

    public function tasks()
    {
        return $this->hasManyThrough('App\Task','App\Activity');
    }

}
