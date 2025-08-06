import { BO3mapperService, IMatchData } from "./mappers/BO3mapperService";

interface IFetchServiceBO3Dependencies {
  BO3mapperService: BO3mapperService;
}
export class FetchServiceBO3 {
  constructor(private dependencies: IFetchServiceBO3Dependencies) {}
  async getUpcomingMatches(): Promise<IMatchData[]> {
    try {
      const date = new Date();

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;

      const url = process.env.GET_UPCOMING_MATCHES_TODAY_URL!.replace(
        "%DATE%",
        formattedDate
      );

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      const allMatches = [
        data.data.tiers.high_tier?.matches || [],
        data.data.tiers.low_tier?.matches || [],
      ];
      const mappedData =
        this.dependencies.BO3mapperService.matchMap(allMatches);
      return mappedData;
    } catch (error) {
      throw error;
    }
  }
}

export async function fetchServiceBO3() {
  const dependencies: IFetchServiceBO3Dependencies = {
    BO3mapperService: new BO3mapperService(),
  };
  const instance = new FetchServiceBO3(dependencies);
  return await instance.getUpcomingMatches();
}
