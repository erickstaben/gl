<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Task;
use App\Event;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $processes = $request->user()->activities;

        
        return response()->api($processes);
        
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'process_id' => 'numeric|required',
            'due_day' => 'numeric|required',
            'name' => 'string|required',
            'description' => 'string',
            'is_complete' => 'boolean',
        ]);
        $task = Task::create(array(
            'process_id' => $request['process_id'],
            'due_day' => $request['due_day'],
            'name' => $request['name'],
            'description' => $request['description'] || '',            
            'is_complete' => $request['is_complete'] || false,
        ));          
        
        return response()->api($task);
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  number $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,$id)
    {
        $task = Task::findOrFail($id);
        return response()->api($task);
    }
    
    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        foreach($request->except(['shouldLog']) as $key => $req){
            $task[$key] = $req;
        }
        $task->save();
        $shouldLog = $request['shouldLog'] == 0 ? false : true;
        if($shouldLog){
            Event::create(array(
                'type' => 'TaskEvent',
                'duration' => null,
                'user_id' => $request->user()->id,
                'company_id' => $task->activity->process->company_id,
                'reference_id' => $task->id,
                'reference_model' => 'task',
            ));
        }
        if($task->activity->isTasksCompleted()){
            $activity = $task->activity;
            $ids = $activity->tasks->pluck('id');
            $duration_sum = Event::where('reference_model','task')->whereIn('reference_id',$ids)->sum('duration');
            
            Event::create(array(
                'type' => 'ActivityEvent',
                'duration' => $duration_sum,
                'user_id' => $request->user()->id,
                'company_id' => $task->activity->process->company_id,
                'reference_id' => $activity->id,
                'reference_model' => 'activity',
            ));
            if($activity->process->isActivitiesCompleted()){
                $process = $activity->process;
                $ids = $process->activities->pluck('id');
                $duration_sum = Event::where('reference_model','activities')->whereIn('reference_id',$ids)->sum('duration');
                
                Event::create(array(
                    'type' => 'ProcessEvent',
                    'duration' => $duration_sum,
                    'user_id' => $request->user()->id,
                    'company_id' => $process->company_id,
                    'reference_id' => $process->id,
                    'reference_model' => 'process',
                ));
            }
        }
        return response()->api($task->load('activity'));
    }

    
    public function destroy(Request $request,$id)
    {
        $task = Task::findOrFail($id)->delete();
        return response()->api('Deletado com sucesso');
    }
}
