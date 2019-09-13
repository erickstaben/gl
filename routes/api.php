<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// default name space for all routes is 'App\Http\Controllers\Api'

$api_version = config('api.api_version');
Route::group(["prefix" => "{$api_version}","middleware" => ["cors"]], function() {
    // register auth routes
    Route::prefix('auth')
        ->group(base_path('routes/api/auth.php'));
    // register users routes
    Route::prefix('users')
        ->group(base_path('routes/api/users.php'));
    // register articles routes
    Route::prefix('articles')
        ->group(base_path('routes/api/articles.php'));
    // register cards routes
    Route::prefix('cards')
        ->group(base_path('routes/api/cards.php'));
    // register recurrentCards routes
    Route::prefix('recurrentCards')
        ->group(base_path('routes/api/recurrentCards.php'));
    // register pipes routes
    Route::prefix('pipes')
        ->group(base_path('routes/api/pipes.php'));
    // register phases routes
    Route::prefix('phases')
        ->group(base_path('routes/api/phases.php'));
    // register companies routes
    Route::prefix('companies')
        ->group(base_path('routes/api/companies.php'));

    
});
