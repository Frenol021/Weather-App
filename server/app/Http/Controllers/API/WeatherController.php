<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class WeatherController extends Controller
{
    //
     /**
     * get weather from weatherAPi.
     *
     *
     *
     */
    public function getWeather(Request $request)
    {
        $city = $request->input('city');
        $apiKey = env('WEATHER_API_KEY');
        $url = "https://api.openweathermap.org/data/2.5/weather?q={$city}&appid={$apiKey}&units=metric";
        $response = file_get_contents($url);
        $weatherData = json_decode($response, true);
        if (isset($weatherData['main'])) {
            return response()->json([
                'temperature' => $weatherData['main']['temp'],
                'description' => $weatherData['weather'][0]['description'],
                'icon' => $weatherData['weather'][0]['icon'],
                'city' => $weatherData['name'],
                'country' => $weatherData['sys']['country'],
                'humidity' => $weatherData['main']['humidity'],
                'wind_speed' => $weatherData['wind']['speed'],
                'pressure' => $weatherData['main']['pressure'],
                'visibility' => $weatherData['visibility'],
                'sunrise' => date('H:i:s', $weatherData['sys']['sunrise']),
                'sunset' => date('H:i:s', $weatherData['sys']['sunset']),
                'timezone' => $weatherData['timezone'],
                'weather' => $weatherData['weather'][0]['main'],
                'feels_like' => $weatherData['main']['feels_like'],
                'temp_min' => $weatherData['main']['temp_min'],
                'temp_max' => $weatherData['main']['temp_max'],
                'wind_deg' => $weatherData['wind']['deg'],
                'wind_gust' => $weatherData['wind']['gust'],
                'clouds' => $weatherData['clouds']['all'],
                'lat' => $weatherData['coord']['lat'],
                'lon' => $weatherData['coord']['lon'],
                'date' => Carbon::createFromTimestamp($weatherData['dt'])->format('jS F Y'),
               // 'direction' => $this->getWindDirection($weatherData['wind']['deg']),
                'weather_icon' => "https://openweathermap.org/img/wn/{$weatherData['weather'][0]['icon']}@2x.png",

            ]);
        } else {
            return response()->json(['error' => 'City not found'], 404);
        }
    }

    /**
     * Get Weather for the next three days.
     * if the same day has different teemperature, it will give the range of temperature.
     * every day to appear only once.
     * exclude today.
     */
    public function getWeatherForecast(Request $request)
    {
        $city = $request->input('city');
        $apiKey = env('WEATHER_API_KEY');
        $url = "https://api.openweathermap.org/data/2.5/forecast?q={$city}&appid={$apiKey}&units=metric";
        $response = file_get_contents($url);
        $weatherData = json_decode($response, true);

        if (!isset($weatherData['list'])) {
            return response()->json(['error' => 'City not found'], 404);
        }

        $forecast = [];
        $tomorrow = Carbon::tomorrow();

        foreach ($weatherData['list'] as $data) {
            $timestamp = Carbon::createFromTimestamp($data['dt']);

            if ($timestamp->lessThan($tomorrow)) {
                continue; // Skip today
            }

            $dateKey = $timestamp->format('jS F Y');

            // Stop once we have 3 days
            if (count($forecast) >= 3 && !isset($forecast[$dateKey])) {
                break;
            }

            if (!isset($forecast[$dateKey])) {
                $forecast[$dateKey] = [
                    'temperatures' => [],
                    'description' => $data['weather'][0]['description'],
                    'icon' => $data['weather'][0]['icon'],
                    'date' => $dateKey,
                    'day' => $timestamp->format('D'),
                ];
            }

            $forecast[$dateKey]['temperatures'][] = $data['main']['temp'];
        }

        // Convert to min/max range
        foreach ($forecast as $key => &$day) {
            $temps = $day['temperatures'];
            $min = min($temps);
            $max = max($temps);
            $day['temperature'] = ($min === $max) ? $min : [$min, $max];
            unset($day['temperatures']); // clean up raw temps
        }

        return response()->json(array_values($forecast));
    }
}
