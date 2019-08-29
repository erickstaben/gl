<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {  
    Route::get('/', 'PhaseController@index');
    Route::post('/', 'PhaseController@store');
    Route::get('/{phase_id}', 'PhaseController@show');
    Route::patch('/{phase_id}', 'PhaseController@update');
    Route::delete('/{phase_id}', 'PhaseController@destroy');
});