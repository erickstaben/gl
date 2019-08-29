<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {

    Route::get('/overview', 'PipeController@overview');
    
    Route::get('/', 'PipeController@index');
    Route::post('/', 'PipeController@store');
    Route::get('/{pipe_id}', 'PipeController@show');
    Route::patch('/{pipe_id}', 'PipeController@update');
    Route::delete('/{pipe_id}', 'PipeController@destroy');
    
});