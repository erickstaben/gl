<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Activity extends Model
{
    protected $fillable = ['due_day','name','process_id','tasks'];

    protected $appends = ['completed_tasks','total_tasks','status'];

    public function tasks(){
        return $this->hasMany('App\Task');
    }

    public function process(){
        return $this->belongsTo('App\Process');        
    }

    public function getCompletedTasksAttribute(){
        return $this->tasks()->sum('is_complete');
    }
    public function getTotalTasksAttribute(){
        return $this->tasks()->count();
    }
    public function getStatusAttribute(){
        $completed = $this->getCompletedTasksAttribute();
        $total = $this->getTotalTasksAttribute();
        if($completed == 0){
            return 'Não iniciado';
        }
        else if($completed < $total){
            return 'Em andamento';
        }
        else if($completed == $total){
            return 'Finalizado';
        }
        else {
            return 'Erro!';
        }
    }
}
