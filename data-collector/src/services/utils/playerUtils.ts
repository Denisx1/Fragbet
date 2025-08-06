import { match } from "assert/strict";
import {
  IPlayerDetails,
  IPlayerMatchDetails,
  IPlayerStatsForEveryMatch,
} from "../../interfaces/playerInterfaces";
import { ITeamData } from "../../interfaces/teamInterfaces";
import { TMatchWithoutFields } from "../lowLevelServices/interfaces/playerFillerInterface";
import { TournamentDetails } from "../../interfaces/tierInterfaces";
import { Tournament } from "../../models";

export const splitPlayerData = (
  playerInfoArrays: Omit<IPlayerDetails, "id">[]
): {
  players: Omit<IPlayerDetails, "id" | "matches">[];
  playersMatches: Omit<IPlayerMatchDetails, "stats">[];
  playerStats: IPlayerStatsForEveryMatch[];
} => {
  const playersWithoutMatches: Omit<IPlayerDetails, "matches" | "id">[] =
    playerInfoArrays.map(({ matches, ...rest }) => rest);

  // 2. Собираем все матчи, удаляя у них поле "stats"
  const matchesWithoutStats: Omit<IPlayerMatchDetails, "stats">[] =
    playerInfoArrays.flatMap((player) =>
      (player.matches || []).map(({ stats, ...matchRest }) => matchRest)
    );

  // 3. Собираем отдельно всю статистику
  const allStats: IPlayerStatsForEveryMatch[] = playerInfoArrays.flatMap(
    (player) => (player.matches || []).flatMap((match) => match.stats || [])
  );
  return {
    players: playersWithoutMatches,
    playersMatches: matchesWithoutStats,
    playerStats: allStats,
  };
};

export function combineTEamWithPlayers(
  players: Omit<IPlayerDetails, "id" | "matches">[],
  teams: { slug: string; id: number }[]
): {
  players: Omit<IPlayerDetails, "matches" | "id">[];
  unknownPlayers: string[];
  unknownTeams: string[];
} {
  const teamSlugMap = new Map<string, number>(
    teams.map((team) => [team.slug, team.id])
  );
  const unknownPlayers: string[] = [];
  const unknownTeams: string[] = [];
  const playersToCreate = players
    .map((player: Omit<IPlayerDetails, "id" | "matches">) => {
      const teamId = teamSlugMap.get(player.team_slug);

      if (!teamId) {
        unknownTeams.push(player.team_slug);
        unknownPlayers.push(player.player_nickname);
        return;
        // Пропускаем игрока, если команды нет
      }
      return {
        ...player,
        team_id: teamId,
      };
    })
    .filter((player) => player !== undefined);
  return {
    players: playersToCreate,
    unknownPlayers,
    unknownTeams,
  };
}
export type TFullMatch = Omit<
  IPlayerMatchDetails & {
    team_id: number;
    enemy_team_id: number;
    player_id: number;
    tournament_id: number;
  },
  "stats"
>;
export function combinePlayersWithMatches(
  match: Omit<IPlayerMatchDetails, "stats">,
  team: Omit<ITeamData, "players" | "country">,
  enemyTeam: Omit<ITeamData, "players" | "country">,
  player: Omit<IPlayerDetails, "matches">,
  tournament: Tournament
): TFullMatch {
  return {
    ...match,
    team_id: team?.id,
    enemy_team_id: enemyTeam?.id,
    player_id: player?.id ? player.id : 0,
    tournament_id: tournament?.id,
  };
}

export function separatePlayerMatchData(
  playerMatchesData: TFullMatch[]
): TFullMatch[][] {
  const chunkSize = 1000; // Размер пакета
  const matchesToCreateChunks: TFullMatch[][] = [];

  for (let i = 0; i < playerMatchesData.length; i += chunkSize) {
    matchesToCreateChunks.push(playerMatchesData.slice(i, i + chunkSize));
  }
  return matchesToCreateChunks;
}

export function filterPlayerMatches(
  playerMatchesData: Omit<IPlayerMatchDetails, "stats">[],
  playerSlugs: string[]
): Omit<IPlayerMatchDetails, "stats">[] {
  return playerMatchesData.filter((match) =>
    playerSlugs.includes(match.player_slug)
  );
}

export function averageStatsByPlayer(
  playerStats: IPlayerStatsForEveryMatch[]
): IPlayerStatsForEveryMatch[] {
  const grouped = playerStats.reduce((acc, item) => {
    const slug = item.player_slug;
    if (!acc[slug]) {
      acc[slug] = [];
    }
    acc[slug].push(item);
    return acc;
  }, {} as Record<string, IPlayerStatsForEveryMatch[]>);

  return Object.keys(grouped).map((slug) => {
    const playerData = grouped[slug];
    const count = playerData.length;

    const numericFields: (keyof IPlayerStatsForEveryMatch)[] = [
      "player_rating",
      "player_rating_value",
      "total_player_rating_value",
      "hits",
      "shots",
      "kills",
      "multikills",
      "death",
      "assists",
      "damage",
      "first_kills",
      "first_death",
      "trade_kills",
      "trade_death",
      "headshots",
      "accuracy",
      "headshots_accuracy",
      "money_save",
      "total_equipment_value",
      "avg_kill_cost",
      "avg_100dmg_cost",
    ];

    const averages = numericFields.reduce((acc, field) => {
      const sum = playerData.reduce((sum, item) => {
        const value = item[field];
        const numericValue =
          typeof value === "number" && !isNaN(value) ? value : 0;
        return sum + numericValue;
      }, 0);
      acc[field] = sum / count;
      return acc;
    }, {} as Record<keyof IPlayerStatsForEveryMatch, number>);

    return {
      steam_profile_nickname: playerData[0].steam_profile_nickname,
      player_slug: slug,
      player_nickname: playerData[0].player_nickname,
      player_image_url: playerData[0].player_image_url,
      player_country_code: playerData[0].player_country_code,
      team_clan_name: playerData[0].team_clan_name,
      team_slug: playerData[0].team_slug,
      player_rating: averages.player_rating,
      player_rating_value: averages.player_rating_value,
      total_player_rating_value: averages.total_player_rating_value,
      hits: averages.hits,
      shots: averages.shots,
      kills: averages.kills,
      multikills: averages.multikills,
      death: averages.death,
      assists: averages.assists,
      damage: averages.damage,
      first_kills: averages.first_kills,
      first_death: averages.first_death,
      trade_kills: averages.trade_kills,
      trade_death: averages.trade_death,
      headshots: averages.headshots,
      accuracy: averages.accuracy,
      headshots_accuracy: averages.headshots_accuracy,
      money_save: averages.money_save,
      total_equipment_value: averages.total_equipment_value,
      avg_kill_cost: averages.avg_kill_cost,
      avg_100dmg_cost: averages.avg_100dmg_cost,
    } as IPlayerStatsForEveryMatch;
  });
}
