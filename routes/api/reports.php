<?php

use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'auth:api'], function() {
    Route::post('/process', 'ReportController@process');
    Route::post('/user', 'ReportController@user');
    Route::post('/company', 'ReportController@company');
});