import { fetchTeamsFromBo3 } from "./fetch/getTeamFromBo3";
import {
  delay,
  extractUniqueTeam,
  hasSegregatedSlug,
  normalizeTeamName,
} from "./utils/utils";
import {
  TeamFromBO3,
  TeamFromBO3WithoutPlayers,
  TeamFromBO3WithoutPlayersAndCountry,
} from "./types/teamsTypes";
import { teamStatService } from "../teamStats/teamStatService";
import { RegionRepository } from "../region/repository/region.repository";
import { CountryRepository } from "../country/repository/country.repository";
import { TeamRepository } from "./repository/team.repository";
import { MatchRepository } from "../upcomingMatches/repository/upcomingMatchesRepository";
import { MatchData } from "../upcomingMatches/upcomingMatchService";
import { AiPredictionRepository } from "../aiPrediction/repository/ai_predictionRepository";
import {
  TeamServiceFunctionDependencies,
  TeamServiceRepositoryDependencies,
} from "./types/teamServiceTypes";
import { getTeamAndIdFromMatch, GridGotData } from "../grid/gridService";
import { fetchServicePanda } from "../upcomingMatches/fetches/fetchPandaService";
import { fetchTeamsFromPanda } from "./fetch/getTeamFromPanda";

export class TeamService {
  constructor(
    private funcDependencies: TeamServiceFunctionDependencies,
    private repositoryDependencies: TeamServiceRepositoryDependencies
  ) {}
  async handleTeams(
    uniqueTeamsSlugs: string[],
    matchData: MatchData[]
  ): Promise<string[]> {
    try {
      const { teams: teamsDataFromBo3, playersSlugs } = await this.getTeamData(
        uniqueTeamsSlugs
      );
      const newTeams = await this.createTeam(teamsDataFromBo3);
      await Promise.all([
        this.updatematch(matchData, newTeams),
        this.updateAiPrediction(matchData, newTeams),
        this.funcDependencies.teamStatService(uniqueTeamsSlugs, newTeams),
      ]);
      return playersSlugs;
    } catch (error) {
      throw error;
    }
  }
  private async createTeam(
    teamsDataFromBo3: TeamFromBO3[]
  ): Promise<TeamFromBO3WithoutPlayers[]> {
    try {
      const result: TeamFromBO3WithoutPlayersAndCountry[] = [];

      for (const team of teamsDataFromBo3) {
        let countryId: number | null = null;

        if (team.country?.code) {
          const country =
            await this.repositoryDependencies.countryRepository.findCountryByCode(
              team.country.code
            );
          if (country) {
            countryId = country.id;
          } else {
            console.warn(`Country not found for code: ${team.country.code}`);
          }
        } else {
          console.warn(`No country code for team: ${team.slug}`);
        }

        const { country, players, ...rest } = team;

        result.push({
          ...rest,
          country_id: countryId,
        });
      }
    
      const newTeams =
        await this.repositoryDependencies.teamRepository.createTeam(result);
      return newTeams;
    } catch (error) {
      throw error;
    }
  }
  private async getTeamAndIdFromMatch(): Promise<GridGotData[]> {
    try {
      const getTeamUpcomingMatchesFromGrid =
        await this.funcDependencies.getTeamAndIdFromMatch();
      return getTeamUpcomingMatchesFromGrid;
    } catch (error) {
      throw error;
    }
  }

  private async updatematch(
    matchData: MatchData[],
    newTeams: TeamFromBO3WithoutPlayers[]
  ): Promise<void> {
    try {
      for (const match of matchData) {
        if (!this.funcDependencies.hasSegregatedSlug(match)) {
          continue;
        }

        const teamsObj: {
          team1_id: number | null;
          team2_id: number | null;
          teamNames: string[];
        } = {
          team1_id: null,
          team2_id: null,
          teamNames: [],
        };

        const matchSlugParts = match.segregatedMatchSlug.map((s) =>
          s.toLowerCase().trim()
        );

        for (const team of newTeams) {
          const teamSlug = team.slug.toLowerCase().trim();
          const teamName = team.name.toLowerCase().trim();

          if (matchSlugParts.includes(teamSlug)) {
            if (teamsObj.team1_id === null) {
              teamsObj.team1_id = team.id!;
              teamsObj.teamNames.push(team.name);
            } else if (
              teamsObj.team2_id === null &&
              team.id !== teamsObj.team1_id
            ) {
              teamsObj.team2_id = team.id!;
              teamsObj.teamNames.push(team.name);
            }
          }
        }

        // Обновляем матч только если найдены обе команды
        if (teamsObj.team1_id && teamsObj.team2_id) {
          await this.repositoryDependencies.matchRepository.updateMatch(
            match.match_id,
            {
              team1_id: teamsObj.team1_id,
              team2_id: teamsObj.team2_id,
            }
          );
        }
      }

      return;
    } catch (error) {
      throw error;
    }
  }

  private async updateAiPrediction(
    matchData: MatchData[],
    newTeams: TeamFromBO3WithoutPlayers[]
  ): Promise<void> {
    try {
      const predictions =
        await this.repositoryDependencies.aiPredictionRepository.findAllPredictionsWithnRange(
          matchData.map((match: MatchData) => match.match_id)
        );
      for (const prediction of predictions) {
        const teamsSlugs = this.funcDependencies.extractUniqueTeam(
          prediction.match_slug
        );

        const team1 = newTeams.find((team) => team.slug === teamsSlugs[0]);
        const team2 = newTeams.find((team) => team.slug === teamsSlugs[1]);

        let winnerTeamId: number | null = null;
        for (const team of newTeams) {
          if (teamsSlugs.includes(team.slug)) {
            if (
              prediction.prediction_team1_score >
              prediction.prediction_team2_score
            ) {
              winnerTeamId = team1?.id ?? 0;
            } else if (
              prediction.prediction_team1_score <
              prediction.prediction_team2_score
            ) {
              winnerTeamId = team2?.id ?? 0;
            }
          }
        }

        await this.repositoryDependencies.aiPredictionRepository.updatePrediction(
          {
            ...prediction,
            prediction_winner_team_id: winnerTeamId!,
          }
        );
      }
      return;
    } catch (error) {
      throw error;
    }
  }
  private async getTeamData(
    teamsSlugs: string[]
  ): Promise<{ teams: TeamFromBO3[]; playersSlugs: string[] }> {
    try {
      const teams: TeamFromBO3[] = [];
      const playersSlugs: string[] = [];
      for (const teamsSlug of teamsSlugs) {
        const team = await this.funcDependencies.fetchTeamsFromBo3(teamsSlug);
        const { players, ...rest } = team;
        if (rest.slug === "undefined") {
          console.warn(`No data found for team slug: ${teamsSlug}`);
          continue;
        }
        teams.push(rest);
        playersSlugs.push(...players!.map((player) => player.slug));
        await this.funcDependencies.delay(30);
      }

      return { teams, playersSlugs };
    } catch (error) {
      throw error;
    }
  }
}

export function teamService(
  uniqueTeamsSlugs: string[],
  matchData: MatchData[]
) {
  const funcDependensies: TeamServiceFunctionDependencies = {
    fetchTeamsFromBo3,
    teamStatService,
    hasSegregatedSlug,
    extractUniqueTeam,
    getTeamAndIdFromMatch,
    normalizeTeamName,
    delay,
    fetchServicePanda,
    fetchTeamsFromPanda,
  };
  const repositoryDependencies: TeamServiceRepositoryDependencies = {
    regionRepository: new RegionRepository(),
    countryRepository: new CountryRepository(),
    teamRepository: new TeamRepository(),
    matchRepository: new MatchRepository(),
    aiPredictionRepository: new AiPredictionRepository(),
  };
  const instance = new TeamService(funcDependensies, repositoryDependencies);
  return instance.handleTeams(uniqueTeamsSlugs, matchData);
}
