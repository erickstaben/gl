<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
    protected $fillable = ['company_id','user_id','name'];

    protected $appends = ['total_tasks','completed_tasks','total_activities', 'completed_activities'];


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
    public function getCompletedActivitiesAttribute(){
        $sum = 0;
        foreach($this->activities as $activity){
            $sum += $activity->isTasksCompleted();
        }
        return $sum;
    }
    public function getTotalActivitiesAttribute(){
        return $this->activities->count();
    }

    public function isActivitiesCompleted(){
        if($this->total_tasks == $this->completed_tasks && $this->total_tasks !== 0){
            return true;
        }
        return false;
    }
}
