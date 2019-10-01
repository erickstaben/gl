
<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {

    
    Route::get('/', 'RecurrentCardController@index');
    Route::post('/', 'RecurrentCardController@store');
    Route::get('/enabledFields', 'RecurrentCardController@enabledFields');
    Route::get('/{recurrentCard_id}', 'RecurrentCardController@show');
    Route::patch('/{recurrentCard_id}', 'RecurrentCardController@update');
    Route::delete('/{recurrentCard_id}', 'RecurrentCardController@destroy');
    Route::get('/generate', 'RecurrentCardController@generate');
    
});
