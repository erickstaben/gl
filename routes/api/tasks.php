<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {

    Route::get('/', 'TaskController@index');
    Route::post('/', 'TaskController@store');
    Route::get('/{task_id}', 'TaskController@show');
    Route::patch('/{task_id}', 'TaskController@update');
    Route::delete('/{task_id}', 'TaskController@destroy');
    
});