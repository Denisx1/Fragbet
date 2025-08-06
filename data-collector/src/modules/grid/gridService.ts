import { normalizeTeamName } from "../team/utils/utils";
import { fetchMatches } from "./fetch/getUpcomingMatches";

interface GridCentralDataGetterDependencies {
  fetchMatches: () => Promise<any[]>;
  normalizeTeamName(name: string): string
}
export interface GridGotData{
  id: number;
  teamsNames: string[];
  startTimeScheduled: string;
}
class GridCentralDataGetter {
  constructor(private dependencies: GridCentralDataGetterDependencies) {}
  async getTodayMatches(): Promise<GridGotData[]> {
    try {
      const matches = await this.dependencies.fetchMatches();
      return this.getTeamAndIdFromMatch(matches);
    } catch (error) {
      throw error;
    }
  }

  private getTeamAndIdFromMatch(matches: any[]): GridGotData[] {
    const result: GridGotData[] = [];
    for (const match of matches) {
      result.push({
        id: match.node.id,
        teamsNames: [
          match.node.teams[0].baseInfo.name,
          match.node.teams[1].baseInfo.name,
        ],

        startTimeScheduled: match.node.startTimeScheduled,
      });
    }
  
    return result;
  }
}

export function getTeamAndIdFromMatch(): Promise<GridGotData[]> {
  const dependencies: GridCentralDataGetterDependencies = {
    fetchMatches,
    normalizeTeamName
  };
  const gridCentralDataGetter = new GridCentralDataGetter(dependencies);
  return gridCentralDataGetter.getTodayMatches();
}
