import { fetchServicePanda } from "./fetches/fetchPandaService";
import { IncomingMatch, Opponent } from "./fetches/mappers/mapperService";
import { fetchServiceBO3 } from "./fetches/fetchBO3";
import {
  AIPrediction,
  IGame,
  IMatchData,
} from "./fetches/mappers/BO3mapperService";
import { IMatchRepository } from "./repository/upcomingMatches";
import { ICodeRepository } from "../../repository/tierRepository/interfaces/codeInterfaces";
import { CodeRepository } from "../../repository/tierRepository/codeRepository";

import { AiPredictionRepository } from "../aiPrediction/repository/ai_predictionRepository";
import { IAiPredictionRepository } from "../aiPrediction/repository/interface";
import { IGameRepository } from "../upcomingMatchGames/gameRepository/interface";

import { MatchRepository } from "./repository/upcomingMatchesRepository";
import { GameRepository } from "../upcomingMatchGames/gameRepository/gameRepository";
import {
  extractUniqueTeamNames,
  getSlugWithoutDate,
} from "./utils/upcomingMatchesUtils";
import {
  Match,
  MatchCreationAttributes,
} from "./upcomingMatchModel/upcomingMatchModel";
import { Game } from "../upcomingMatchGames/gameModel/gameModel";
import { Code } from "../../models/tierModels/code";
import { getTeamAndIdFromMatch } from "../grid/gridService";

interface UpcomingMatchDependencies {
  matchRepo: IMatchRepository;
  codeRepo: ICodeRepository;
  aiPredictionRepo: IAiPredictionRepository;
  gameRepo: IGameRepository;
  fetchServicePanda: () => Promise<IncomingMatch[]>;
  fetchServiceBO3: () => Promise<IMatchData[]>;

  extractUniqueTeamNames: (slug: string) => string[] | null;
  getSlugWithoutDate: (slug: string) => string;
}
interface CreatePredictionData {
  match_id: number;
  match_slug: string;
  ai_prediction: AIPrediction;
}
interface CreateGameData {
  match_id: number;
  data: IGame;
}
interface MatchBase {
  match_id: number;
  match_slug: string;
}

export interface MatchWithTeamNames extends MatchBase {
  teamNamesWithoutDate: string;
}

export interface MatchWithSegregatedSlug extends MatchBase {
  segregatedMatchSlug: string[];
}

export type MatchData = MatchWithTeamNames | MatchWithSegregatedSlug;
export class UpcomingMatchService {
  constructor(private dependencies: UpcomingMatchDependencies) {}
  async getUpcomingMatches(): Promise<{
    uniqueTeamsSlugs: string[];
    matchData: MatchData[];
  }> {
    try {
      // players-1-vs-america-esports-30-05-2025'
      const bo3Matches = await this.dependencies.fetchServiceBO3();
      const { uniqueTeamsSlugs, matchData } = await this.processBo3Matches(
        bo3Matches
      );

      return {
        uniqueTeamsSlugs,
        matchData,
      };
    } catch (error) {
      throw error;
    }
  }
  private async processBo3Matches(bo3Matches: IMatchData[]): Promise<{
    uniqueTeamsSlugs: string[];
    matchData: MatchData[];
  }> {
    try {
      const teamsSlugsBo3: Set<string> = new Set();

      const matchData: MatchData[] = [];
      for (const ai of bo3Matches) {
        const teamNames = this.dependencies.extractUniqueTeamNames(ai.slug);
       
        
        if (teamNames === null) {
          console.warn(`No team names found for slug: ${ai.slug}`);
          continue;
        }
        teamNames.forEach((teamName) => teamsSlugsBo3.add(teamName));
        const matchSlug = await this.processSingleMatch(ai);
        matchData.push({
          match_id: matchSlug.match_id,
          match_slug: matchSlug.match_slug,
          segregatedMatchSlug: teamNames,
        });
      }
      const uniqueTeamsSlugs = [...teamsSlugsBo3];
      return {
        uniqueTeamsSlugs,
        matchData,
      };
    } catch (error) {
      throw error;
    }
  }
  private async processSingleMatch(ai: IMatchData): Promise<MatchData> {
    const { ai_prediction, games } = ai;

    const match = await this.addTierId({
      bo3_slug: ai.slug,
      team1_id: null!,
      team2_id: null!,
      tier: ai.tier,
      status: "upcoming",
      bo_type: 3,
      start_date: ai.start_date,
      stars: ai.stars,
    });

    const checkExistMatch = await this.dependencies.matchRepo.findBySlug(
      ai.slug
    );

    let matchRecord: Match;
    if (checkExistMatch) {
      matchRecord = checkExistMatch;
    } else {
      matchRecord = await this.dependencies.matchRepo.createMatch(match);

      // Создаем связанные данные, только если матч новый
      await Promise.all([
        this.createPrediction({
          match_id: matchRecord.id!,
          match_slug: ai.slug,
          ai_prediction: {
            match_slug: ai.slug,
            prediction_team1_score: ai_prediction.prediction_team1_score,
            prediction_team2_score: ai_prediction.prediction_team2_score,
            prediction_winner_team_id: null!,
          },
        }),
        Promise.all(
          games.map((game) =>
            this.createGame({ match_id: matchRecord.id!, data: game })
          )
        ),
      ]);
    }
    return {
      match_id: matchRecord.id!,
      match_slug: matchRecord.bo3_slug,
      teamNamesWithoutDate: ai.slug,
    };
  }

  private async createGame(data: CreateGameData): Promise<Game> {
    try {
      const game = await this.dependencies.gameRepo.createGame({
        match_id: data.match_id,
        number: data.data.number,
        status: data.data.status,
        complete: false,
        finished: false,
      });
      return game;
    } catch (error) {
      throw error;
    }
  }

  private async createPrediction(
    data: CreatePredictionData
  ): Promise<AIPrediction> {
    try {
      const prediction =
        await this.dependencies.aiPredictionRepo.createPrediction({
          match_id: data.match_id,
          match_slug: data.match_slug,
          prediction_team1_score: data.ai_prediction.prediction_team1_score,
          prediction_team2_score: data.ai_prediction.prediction_team2_score,
          prediction_winner_team_id:
            data.ai_prediction.prediction_winner_team_id,
        });
      return prediction;
    } catch (error) {
      throw error;
    }
  }
  private async addTierId(
    match: Omit<MatchCreationAttributes, "tier_id">
  ): Promise<MatchCreationAttributes> {
    try {
      const code = await this.dependencies.codeRepo.findByValue(match.tier);
      if (!code) {
        throw new Error(`Code not found for tier: ${match.tier}`);
      }
      return {
        ...match,
        tier_id: code.tierId,
      };
    } catch (error) {
      throw error;
    }
  }
}

export function getUpcomingMatches() {
  const dependencies: UpcomingMatchDependencies = {
    matchRepo: new MatchRepository(),
    codeRepo: new CodeRepository(Code),
    aiPredictionRepo: new AiPredictionRepository(),
    gameRepo: new GameRepository(),
    fetchServicePanda,
    fetchServiceBO3,
    extractUniqueTeamNames,
    getSlugWithoutDate,

  };
  const instance = new UpcomingMatchService(dependencies);
  return instance.getUpcomingMatches();
}
