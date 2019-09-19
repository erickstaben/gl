<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Pipe;
use App\User;
use App\Phase;
use App\RecurrentCard;
use Illuminate\Http\Request;

class PipeController extends Controller
{
    
    


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function overview(Request $request)
    {
        $pipes = $request->user()->pipes;
        $pipes->each(function($pipe){
            $pipe['totalCards'] = $pipe->totalCards;
            $pipe['is_favorite'] = $pipe->pivot->is_favorite;
            unset($pipe['pivot']);
        });
        return response()->api($pipes->load(['users']));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $pipe = Pipe::create(array(
            'name' => $request['name'],
        ));   
        Phase::create(array(
            'name' => 'Fase padrão',
            'is_final' => false,
            'order' => 1,
            'due_date' => 1,
            'description' => 'Descrição padrão',
            'client_status' => 'Status para o cliente',
            'pipe_id' => $pipe->id
        ));
        $pipe->users()->sync($request->user()->id);
        return response()->api($pipe);
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
        $pipe = Pipe::findOrFail($id);
        $pipe->load(array_merge(['phases.cards'],(array)$request['load']));
        return response()->api($pipe);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Pipe  $pipe
     * @return \Illuminate\Http\Response
     */
    public function edit(Pipe $pipe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Pipe  $pipe
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Pipe $pipe)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Pipe  $pipe
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,$id)
    {
        $pipe = Pipe::findOrFail($id)->delete();
        return response()->api('Deletado com sucesso');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Pipe  $pipe
     * @return \Illuminate\Http\Response
     */
    public function addUser(Request $request,$id)
    {
        $request->validate([
            'user_id' => 'numeric|required',
        ]);
        $pipe = Pipe::findOrFail($id);
        if($pipe->users()->find($request['user_id'])){
            return response()->api($pipe->load(['users']),'Esse usuário já faz parte desse pipe');
        }
        
        $pipe->users()->attach($request['user_id']);
        return response()->api($pipe->load(['users']));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Pipe  $pipe
     * @return \Illuminate\Http\Response
     * 
     */
    public function addRecurrentCard(Request $request,$id)
    {
        if($request['id']){            
            $pipe = Pipe::findOrFail($id);
            $pipe->recurrentCards()->find($request['id'])->update(array(
                'pipe_id' => $id,
                'user_id' => $request['user_id'],
                'company_id' => $request['company_id'],
                'due_date' => $request['due_date'],
            ));
            return response()->api($pipe->load(['recurrentCards']));
        }
        $request->validate([
            'due_date' => 'numeric|required',
            'company_id' => 'numeric|required',
            'user_id' => 'numeric|required',
        ]);
        $pipe = Pipe::findOrFail($id);
        $recurrentCard = RecurrentCard::create(
            array(
                'pipe_id' => $id,
                'user_id' => $request['user_id'],
                'company_id' => $request['company_id'],
                'due_date' => $request['due_date'],
            )
        );
        return response()->api($pipe->load(['recurrentCards']));
    }

}
