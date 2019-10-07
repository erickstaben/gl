<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {

    Route::get('/', 'ProcessController@index');
    Route::post('/', 'ProcessController@store');
    Route::get('/{process_id}', 'ProcessController@show');
    Route::patch('/{process_id}', 'ProcessController@update');
    Route::delete('/{process_id}', 'ProcessController@destroy');
    
});