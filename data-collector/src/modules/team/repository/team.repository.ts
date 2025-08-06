import { Team, TeamCreationAttributes } from "../model/team.model";
import { TeamFromBO3WithoutPlayers } from "../types/teamsTypes";
import { ITeamRepository } from "./interface";

export class TeamRepository implements ITeamRepository {
  async createTeam(team: TeamCreationAttributes[]): Promise<TeamFromBO3WithoutPlayers[]> {
    const newTeams = await Team.bulkCreate(team, {
      updateOnDuplicate: ["six_month_earned", "rank", "country_id"],
    });
    return newTeams.map((team) => team.get({ plain: true }));
  }
  async getTeams(): Promise<Team[]> {
    const teams = await Team.findAll({
      raw: true, // Возвращаем результаты как обычные объекты, без экземпляров моделей
      attributes: ["slug", "id"], // Выбираем только поля slug и id
    });

    // Преобразуем данные, оставляя только slug и id
    return teams;
  }
  async getTeamBySlug(slug: string): Promise<Team | null> {
    try {
      const team = await Team.findOne({
        where: { slug },
      });
      return team;
    } catch (error) {
      return null;
    }
  }
}
