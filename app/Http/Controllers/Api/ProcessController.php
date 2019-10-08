<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use App\Process;

class ProcessController extends Controller
{
    public function index(Request $request)
    {
        $processes = $request->user()->processes->load(['activities.tasks']);
        return response()->api($processes);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'company_id' => 'numeric|required',
            'user_id' => 'numeric|required',
            'name' => 'string|required',
            'activities' => 'array',
        ]);
        $process = Process::create(array(
            'company_id' => $request['company_id'],
            'user_id' => $request['user_id'],
            'name' => $request['name']
        ));  
        $activities = $request['activities'];
        $activities_object = [];
        if($activities){
            foreach($activities as $act){
                $activities_object[] =  [
                    'name' => $act['name'],
                    'due_day' => property_exists((object)$act,'due_day') ? $act['due_day'] : null,             
                ];
            }
        }
        $process->activities()->createMany($activities_object); 
        foreach($process->activities as $key=>$activity){
            $tasks_object = [];
            foreach($activities[$key]['tasks'] as $task){
                $tasks_object[] =  [
                    'name' => $task['name'],
                    'description' => property_exists((object)$task,'description') ? $task['description'] : null,
                    'due_day' => property_exists((object)$task,'due_day') ? $task['due_day'] : null,                 
                ];
            }
            $activity->tasks()->createMany($tasks_object);
        }
        
        return response()->api($process->load(['activities.tasks']));
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
        $process = Process::findOrFail($id);
        return response()->api($process->load(['activities.tasks']));
    }
    
    public function update(Request $request, Pipe $pipe)
    {
        $process = Process::findOrFail($id);
        if($request['name']){
            $process->name = $request['name'];
        }
        $process->save();
        return response()->api($process);
    }

    
    public function destroy(Request $request,$id)
    {
        $process = Process::findOrFail($id)->delete();
        return response()->api('Deletado com sucesso');
    }
}
