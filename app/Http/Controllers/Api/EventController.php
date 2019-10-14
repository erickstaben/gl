<?php

namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\CardLog;
use App\Event;

class EventController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'company_id' => 'numeric|required',
            'type' => 'string|required',
            'duration' => 'string|required',
            'user_id' => 'numeric',
            'description' => 'string',
            'other' => 'string'
        ]);
        $request->merge([
            'user_id' => $request->user()->id,            
        ]);

        $event = Event::create($request->all());
        
        return response()->api($event);
    }
}
