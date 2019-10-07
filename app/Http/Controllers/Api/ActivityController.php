<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Activity;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $activities = $request->user()->processes->activities;
        return response()->api($activities);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'process_id' => 'numeric|required',
            'due_day' => 'numeric|required',
            'name' => 'string|required',
            'tasks' => 'array',
        ]);
        $activity = Activity::create(array(
            'process_id' => $request['process_id'],
            'due_day' => $request['due_day'],
            'name' => $request['name']
        ));  
        $tasks = $request['tasks'];
        $tasks_object = [];
        if($tasks){
            foreach($tasks as $act){
                $tasks_object[] =  [
                    'name' => $act['name'],
                    'due_day' => $act['due_day']                    
                ];
            }
        }
        $activity->tasks()->createMany($tasks_object);  
        
        return response()->api($activity->load(['tasks']));
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
        $activity = Activity::findOrFail($id);
        return response()->api($activity->load(['tasks']));
    }
    
    public function update(Request $request,$id)
    {
        $activity = Activity::findOrFail($id);
        if($request['name']){
            $activity->name = $request['name'];
        }
        $activity->save();
        return response()->api($activity);
    }

    
    public function destroy(Request $request,$id)
    {
        $activity = Activity::findOrFail($id)->delete();
        return response()->api('Deletado com sucesso');
    }
}
