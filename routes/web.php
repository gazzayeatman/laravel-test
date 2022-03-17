<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

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

Route::get('/', function () {
    return view('index');
})->middleware('auth');

Route::get('/users', 'App\Http\Controllers\UsersDashboardController@index');
Route::get('/users/add-user', 'App\Http\Controllers\UsersDashboardController@addUser');
Route::post('/users/add-user', 'App\Http\Controllers\UsersDashboardController@saveUser');
Route::delete('/users/delete-user/{id}', 'App\Http\Controllers\UsersDashboardController@deleteUser');

Auth::routes();
