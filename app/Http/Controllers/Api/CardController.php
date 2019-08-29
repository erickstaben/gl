<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Card;
use App\Phase;
use Illuminate\Http\Request;

class CardController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        $cards = Card::limit($request['limit'] ?: 100)->offset($request['offset'] ?: 0)->get();
        return response()->api(
            $cards->load(['company','phase.phaseFields','creator','assignedUsers','fields','cardEmails'])
        );
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
            'creator_id' => 'numeric|required',
            'phase_id' => 'numeric|required',
            'company_id' => 'numeric|required',
            'title' => 'string|required',
            'due_date' => 'string|required',
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
     * @param  \App\Card  $card
     * @return \Illuminate\Http\Response
     */
    public function show(Card $card)
    {
        $card->load(['company','phase.phaseFields','creator','assignedUsers','fields','cardEmails']);        
        return response()->api($card);   
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Card  $card
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Card $card)
    {
        $request->validate([
            'creator_id' => 'numeric',
            'phase_id' => 'numeric',
            'company_id' => 'numeric',
            'title' => 'string',
            'due_date' => 'string',
        ]);
        $extra_fields = $request->except($card->getFillable());
        $fields = $request->only($card->getFillable());
        if($extra_fields)
        {
            foreach($extra_fields as $key => $field)
            {
                switch($key)
                {
                    case 'users':
                        $card->assignedUsers()->sync(array_into_attachable($field));
                        break;
                    case 'fields':
                        $card->fields()->sync(array_into_attachable_with_attributes($field,['value']));
                        break;
                    default:
                        break;
                }
            }            
        }
        $card->update($fields);
        return response()->api($card->load(['company','phase.phaseFields','creator','assignedUsers','fields','cardEmails']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Card  $card
     * @return \Illuminate\Http\Response
     */
    public function destroy(Card $card)
    {
        $card->assignedUsers()->detach();
        $card->fields()->detach();
        $card->cardEmails()->delete();
        $card->delete();
        return response()->api([],'O card foi excluido permanentemente com sucesso.');
    }

    public function move(Request $request,$id,$phase_id){
        $card = Card::findOrFail($id);
        $phase = Phase::find($phase_id);
        if($phase && ($phase->pipe->id == $card->phase->pipe->id)){
            $card->phase_id = $phase_id;
            $card->save();
            return response()->api_patch($card->load(['phase.phaseFields','assignedUsers','fields','cardEmails']),['new_phase' => $phase_id]);  
        }
        return response()->api_error('Essa fase não existe nesse pipe');        
    }
}
