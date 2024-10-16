import fs from 'fs/promises';

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
    private static instance: HistoryService;
    private history: City[] = []; // Array of City objects
  
    private constructor() {
      // private constructor to prevent direct instantiation
    }
  
    public static getInstance(): HistoryService {
      if (!HistoryService.instance) {
        HistoryService.instance = new HistoryService();
      }
      return HistoryService.instance;
    }
  
 
    // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
    private async write(): Promise<void> {
        try {
          const data = JSON.stringify(this.history, null, 2);
          await fs.writeFile('searchHistory.json', data);
          console.log('Search history updated!');
        } catch (error) {
          console.error('Failed to write search history:', error);
          throw error;
        }
    }

    // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
    public async getCities(): Promise<City[]> {
        await this.read();
        return this.history;
    }

    // TODO Define an addCity method that adds a city to the searchHistory.json file
    public async addCity(city: string): Promise<void> {
      await this.read();
      const id = (this.history.length + 1).toString();
      this.history.push(new City(city, id));
      await this.write();
    }

    // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
    public async removeCity(id: string): Promise<void> {
        this.history = this.history.filter((city) => city.id !== id);
        await this.write();
    }

    // TODO: Define a read method that reads the cities from the searchHistory.json file
    private async read(): Promise<void> {
        try {
            const data = await fs.readFile('searchHistory.json', 'utf-8');
            this.history = JSON.parse(data);
        } catch (error) {
            console.error('Failed to read search history:', error);
            this.history = [];
        }
    }
}

export default HistoryService.getInstance();
