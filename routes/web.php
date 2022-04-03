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

Route::any('/login', function() {
    return view('auth.login');
})->middleware('auth');

Route::any('/register', function() {
    return view('auth.register');
})->middleware('auth');


Route::any('/{all}', function () {
    return view('layouts.app');
})->where(['all' => '.*'])
    ->middleware('auth');

Auth::routes();

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
