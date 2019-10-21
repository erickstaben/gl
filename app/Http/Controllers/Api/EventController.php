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
        ]);
        $request->merge([
            'user_id' => $request->user()->id,            
        ]);

        $values = $request->all();
        $event = Event::create($values);
        
        return response()->api($event);
    }

}
