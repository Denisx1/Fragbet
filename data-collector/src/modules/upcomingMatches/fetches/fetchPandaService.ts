import { PandaMapperService, IncomingMatch } from "./mappers/mapperService";
interface Dependencies {
  mapperService: PandaMapperService;
}

export class FetchServicePanda {
  constructor(private dependencies: Dependencies) {}

  async getUpcomingMatches(): Promise<IncomingMatch[]> {
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");

      const begin = `${year}-${month}-${day}T00:00:00Z`;
      const end = `${year}-${month}-${day}T23:59:59Z`;
      const response = await fetch(
        `https://api.pandascore.co/csgo/matches/upcoming?range[begin_at]=${begin},${end}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PANDASCORE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
    
      const mappedData =
        this.dependencies.mapperService.mapUpcomingMatches(data);

      return mappedData;
    } catch (error) {
      throw error;
    }
  }
}

export async function fetchServicePanda(): Promise<IncomingMatch[]> {
  const dependencies: Dependencies = {
    mapperService: new PandaMapperService(),
  };

  const instance = new FetchServicePanda(dependencies);
  return await instance.getUpcomingMatches();
}
