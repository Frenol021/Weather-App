<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\WeatherController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/weather', [WeatherController::class, 'getWeather']);
Route::get('/api/weather/forecast', [WeatherController::class, 'getWeatherForecast']);
