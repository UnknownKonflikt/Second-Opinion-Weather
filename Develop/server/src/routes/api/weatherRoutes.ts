import express from 'express';
import LocalHistoryServiceClass from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// Initialize WeatherService with your API key and base URL
const router = express.Router();
const apiKey = process.env.API_KEY || '... /env'; 
const baseURL = 'https://api.openweathermap.org/data/2.5';
const weatherService = WeatherService.createInstance(apiKey, baseURL);
const historyService = LocalHistoryService.getInstance();
  // Your implementation to get weather for city
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (_req, _res) => {
  const cityName  = _req.body.city;

  if (!cityName) {
    return _res.status(400).json({ message: 'City name is required' });
  }
  try {
    const weatherData = await weatherService.getWeatherData(cityName);
    
    return _res.json(weatherData);
  } catch (error) {
    console.error('Failed to get weather data:', error);
    return _res.status(500).json({ message: 'Failed to get weather data' });
  }
});

// TODO: GET weather data from city name
router.get('/', async (_req, _res) => {
  const cityName = _req.query.city;

  if (!cityName) {
    return _res.status(400).json({ message: 'City name is required' });
  }
  try {
    const weatherData = await weatherService.getWeatherData(cityName);
    return _res.json(weatherData);
  } catch (error) {
    console.error('Failed to get weather data:', error);
    return _res.status(500).json({ message: 'Failed to get weather data' });
  }
});

  // TODO: save city to search history
router.post('/history', async (_req, _res) => {
  const cityName = _req.body.city;
  if (!cityName) {
    return _res.status(400).json({ message: 'City name is required' });
  }
  try {
    await historyService.addCity(cityName);
    _res.json({ message: 'City added to search history' });
  } catch (error) {
    console.error('Failed to add city to search history:', error);
    _res.status(500).json({ message: 'Failed to add city to search history' });
  }
});

// TODO: GET search history
router.get('/history', async (_req, _res) => {
  try {
    const history = await historyService.getHistory();
    _res.json(history);
  } catch (error) {
    console.error('Failed to get search history:', error);
    _res.status(500).json({ message: 'Failed to get search history' });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, _res) => {
  const cityId = _req.params.id;
  if (!cityId) {
    return _res.status(400).json({ message: 'City ID is required' });
  }
  try {
    await historyService.deleteCity(cityId);
    _res.json({ message: 'City deleted from search history' });
  } catch (error) {
    console.error('Failed to delete city from search history:', error);
    _res.status(500).json({ message: 'Failed to delete city from search history' });
  }
});

export default router;

class LocalHistoryServiceClass {

  private static instance: LocalHistoryServiceClass;

  private constructor() {
    // private constructor to prevent direct instantiation
  }

  public static getInstance(): LocalHistoryServiceClass {
    if (!LocalHistoryServiceClass.instance) {
      LocalHistoryServiceClass.instance = new LocalHistoryServiceClass();
    }
    return LocalHistoryServiceClass.instance;
  }

  public addCity(_cityName: string): void {
    // logic to add city to history
  }
}
