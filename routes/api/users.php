<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('/', 'UserController@index');
    Route::match(['put', 'patch'], '/{id}', 'UserController@update')->name('users.update');
});