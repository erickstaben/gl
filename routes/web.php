<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{anyExceptRoot?}/{any?}', function () {
    return file_get_contents(base_path() . '/public/dist/index.html');
})->where(['anyExceptRoot' => '^(?!api).*','any' => '.*']);

Route::fallback(function () {
    echo 'Não encontrou nada';
});
