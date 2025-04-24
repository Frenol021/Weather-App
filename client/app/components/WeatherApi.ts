

export type WeatherData = {
    temperature: number;
    description: string;
    icon: string;
    city: string;
    country: string;
    humidity: number;
    wind_speed: number;
    pressure: number;
    visibility: number;
    sunrise: string;
    sunset: string;
    timezone: string;
    weather: string;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    wind_deg: number;
    wind_gust: number;
    clouds: number;
    lat: number;
    lon: number;
    date: string;
  };

  export type WeatherForecast = {
    temperature: number;
    description: string;
    date:string;
    icon: string; 
    day: string;
    
  }

  export async function fetchWeatherForecast(city: string): Promise<WeatherForecast[]> {
    const res =await fetch(`http://127.0.0.1:8000/api/weather/forecast?city=${city}`)
    if (!res.ok) throw new Error("Failed to fetch weather");
    return res.json();
  }

    
  export async function fetchWeather(city: string): Promise<WeatherData> {
    const res = await fetch(`http://127.0.0.1:8000/api/weather?city=${city}`);
    if (!res.ok) throw new Error("Failed to fetch weather");
    return res.json();
  }
  