<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Phase;
use App\PhaseField;
use Illuminate\Http\Request;

class PhaseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function move(Request $request,$phase1_id,$phase2_id)
    {
        $phase1 = Phase::findOrFail($phase1_id);
        $phase2 = Phase::findOrFail($phase2_id);
        $temp = $phase1->order;
        $phase1->order = $phase2->order;
        $phase1->save();

        $phase2->order = $temp;
        $phase2->save();
        
        return response()->api($phase1);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        
        if($request['pipe_id'])
        {
            $phases = Phase::where('pipe_id',$request['pipe_id'])
                ->limit($request['limit'] ?: 100)
                ->offset($request['offset'] ?: 0)
                ->get();
        }
        else
        {
            $phases = Phase::limit($request['limit'] ?: 100)
                ->offset($request['offset'] ?: 0)
                ->get();
        }
        return response()->api($phases->load(['cards']));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       $request->validate([
            'name' => 'string|required',
            'description' => 'string|required',
            'client_status' => 'string|required',
            'pipe_id' => 'string|required',
            'is_final' => 'boolean|required',
            'order' => 'numeric|required',
            'phaseFields' => 'array',
        ]);

        Phase::where('order','>=',$request['order'])->increment('order');
        $phase = Phase::create($request->all());
        if($request['phaseFields'])
        {
            foreach($request['phaseFields'] as $field){
                PhaseField::create(array_merge($field,array('phase_id' => $phase->id)));
            }
        }

        if($phase->save())
        {
            $phase->load(['cards']);
            return response()->api($phase);
        }
        return response()->api_error();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Phase  $phase
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,int $id)
    {
        $phase = Phase::findOrFail($id);
        $phase->load(['phaseEmails','cards','phaseFields','pipe']);        
        return response()->api($phase);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Phase  $phase
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,int $id)
    {
        $phase = Phase::findOrFail($id);        
        if($request['name'] && $request['value']){
            $phase[$request['name']] = $request['value'];
            $phase->save();
            return response()->api($phase);
        }
        else{
            $phase->update((array)$request);
            if($request['phaseFields']){
                foreach($request['phaseFields'] as $field){
                    if(property_exists((object)$field,'id')){
                        $phaseField = PhaseField::findOrFail($field['id']);
                        $phaseField->update($field);                        
                    }
                    else{
                        $phaseField = new PhaseField(array_merge($field,array('phase_id' => $phase->pipe_id)));
                        $phaseField->save();
                    }
                    
                }
            }
            return response()->api($phase->load(['phaseFields']));
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Phase  $phase
     * @return \Illuminate\Http\Response
     */
    public function destroy(Phase $phase)
    {
        //
    }
}
