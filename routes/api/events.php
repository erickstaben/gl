<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {

    Route::get('/', 'EventController@index');
    Route::post('/', 'EventController@store');
    Route::get('/{event_id}', 'EventController@show');
    Route::patch('/{event_id}', 'EventController@update');
    Route::delete('/{event_id}', 'EventController@destroy');
    
});