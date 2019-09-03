<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Phase;
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
            'name' => 'numeric|required',
            'description' => 'numeric|required',
            'client_status' => 'numeric|required',
            'pipe_id' => 'string|required',
            'is_final' => 'string|required',
            'order' => 'numeric|required',
        ]);

        $card = Card::create($request->all());

        if($request['users'])
        {
            $card->assignedUsers()->sync($request['users']);
        }

        if($request['fields'])
        {
            $card->fields()->sync($request['fields']);
        }

        if($card->save())
        {
            $card->load(['phase','creator','company']);
            return response()->api($card);
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
        $phase[$request['name']] = $request['value'];
        $phase->save();
        return response()->api($phase);
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
