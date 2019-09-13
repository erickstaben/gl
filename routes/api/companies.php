<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {  
    Route::get('/', 'CompanyController@index');
    Route::post('/', 'CompanyController@store');
    Route::get('/{company_id}', 'CompanyController@show');
    Route::patch('/{company_id}', 'CompanyController@update');
    Route::delete('/{company_id}', 'CompanyController@destroy');
});