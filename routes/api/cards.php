<?php

use Illuminate\Support\Facades\Route;


Route::group(['middleware' => 'auth:api'], function() {

    Route::get('/{card_id}/move/{phase_id}', 'CardController@move');
    Route::patch('/{card_id}/fields/{phase_id}', 'CardController@updateFields');
    Route::get('/', 'CardController@index');
    Route::post('/', 'CardController@store');
    Route::get('/{card_id}', 'CardController@show');
    Route::patch('/{card_id}', 'CardController@update');
    Route::delete('/{card_id}', 'CardController@destroy');
    Route::get('/{card_id}/archive', 'CardController@archive');
});