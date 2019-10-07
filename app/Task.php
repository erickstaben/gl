<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $fillable = ['activity_id','name','description','is_complete','due_day'];

    

    public function activity(){
        return $this->belongsTo('App\Activity');
    }
}
