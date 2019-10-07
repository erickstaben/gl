<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {

    Route::get('/', 'ActivityController@index');
    Route::post('/', 'ActivityController@store');
    Route::get('/{activity_id}', 'ActivityController@show');
    Route::patch('/{activity_id}', 'ActivityController@update');
    Route::delete('/{activity_id}', 'ActivityController@destroy');
    
});