<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    protected $fillable = ['company_id','user_id','name'];

    protected $appends = ['total_tasks','completed_tasks'];


    public function activities(){
        return $this->hasMany('App\Activity');
    }

    public function tasks()
    {
        return $this->hasManyThrough('App\Task','App\Activity');
    }

    public function getTotalTasksAttribute(){
        return $this->tasks()->count();
    }
    
    public function getCompletedTasksAttribute(){
        $sum = 0;
        $activities = $this->activities;
        foreach($activities as $activity){
            $sum += $activity->completed_tasks;
        }
        return $sum;
    }
}
