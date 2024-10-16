import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
};
// TODO: Define a class for the Weather object
class Weather {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;

  constructor(temperature: number, description: string, humidity: number, windSpeed: number) {
    this.temperature = temperature;
    this.description = description;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  createInstance(apiKey: string, baseURL: string) {
    throw new Error('Method not implemented.');
  }

  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string;
  private apiKey: string;
  private cityName: string;

  constructor(baseURL: string, apiKey: string, cityName: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.cityName = cityName;
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    try {
      const response = await fetch(query);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const { lat, lon } = data;
      console.log(`Latitude: ${lat}, Longitude: ${lon}`);
      return { lat, lon };
    } catch (error) {
      console.error('Failed to fetch location data:', error);
      throw error;
    }
    return { lat: 0, lon: 0 };
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return locationData;
  }


  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(query: string): string {
    return `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${this.apiKey}`;
  }


  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`);
    return '';
  }


  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    try {
      const response = await fetch('https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=this.apiKey');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const { latitude, longitude, city } = data;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}, City: ${city}`);
      return { latitude, longitude, city };
    } catch (error) {
      console.error('Failed to fetch location data:', error);
      throw error;
    }
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    return {};
  }


  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const temperature = response.main.temp;
    const description = response.weather[0].description;
    const humidity = response.main.humidity;
    const windSpeed = response.wind.speed;

    return new Weather(temperature, description, humidity, windSpeed);
  }


  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray: Weather[] = [];

    for (const data of weatherData) {
      const date = data.date;
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const humidity = data.main.humidity;
      const windSpeed = data.wind.speed;

      forecastArray.push(new Weather(temperature, description, humidity, windSpeed));
    }
      return forecastArray;
    }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather> {
    try {
      const coordinates = await this.fetchLocationData(city);
        const weatherResponse = await this.fetchWeatherData(coordinates);
        return this.parseCurrentWeather(weatherResponse);
    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        throw error;
    }
  }

    }
  

  
  const baseURL = process.env.BASE_URL || 'https://api.openweathermap.org';
  const apiKey = process.env.API_KEY || 'your_api_key_here';
  const cityName = process.env.CITY_NAME || 'default_city';
  
  export default new WeatherService(baseURL, apiKey, cityName);

function fetchAndDestructureLocationData() {
  throw new Error('Function not implemented.');
}
