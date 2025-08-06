// 1. Импорты библиотек
import { config } from "dotenv";
config({ path: "../.env" });
// import "dotenv/config";
// 2. Импорты сервисов и функций

import {
  connectToDataBase,
  disconnectFromDataBase,
} from "./models/connectToDb/connectTodb";

import { startCronJobs } from "./cron/updateMatchStatus";
import {
  getUpcomingMatches,
  MatchData,
} from "./modules/upcomingMatches/upcomingMatchService";
import { teamService } from "./modules/team/teamService";
import { handlePlayerService } from "./modules/player/playerService";
import { fetchMatches } from "./modules/grid/fetch/getUpcomingMatches";
import { getTeamAndIdFromMatch } from "./modules/grid/gridService";

export async function main() {
  try {
    await connectToDataBase();

    // await getUpcomingMatches();
    const { uniqueTeamsSlugs, matchData } = await getUpcomingMatches();
  
    await teamService(uniqueTeamsSlugs, matchData);

    // const test: string[] = [
    //   "glowiing",
    //   "lov1kus",
    //   "notineki",
    //   "fenomen",
    //   "bl1x1",
    //   "brain-rus",
    //   "svemyy",
    //   "clax",
    // ];
    // await handlePlayerService(test);

    // const teamsSlugs = await uploadTierData();
    // const playerSlugs = await uploadTeamData(teamsSlugs);
    // await uploadPlayers(playerSlugs);
  } catch (error) {
    console.error("Error in main function:", error);
    throw error;
  } finally {
    await disconnectFromDataBase();
  }
}

main();

// async function startApp(): Promise<void> {
//   try {
//     await startCronJobs();
//   } catch (error) {
//     process.exit(1);
//   }
// }
// startApp();
