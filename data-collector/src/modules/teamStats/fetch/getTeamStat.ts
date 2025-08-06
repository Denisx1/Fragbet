import { TeamStatsCreationAttributes } from "../model/teamStatsModel";

class GetTeamStat {
  async handleFetch(slugs: string[]): Promise<TeamStatsCreationAttributes[]> {
    try {
      const { data, unfoundTeamSlugs } = await this.getTeamStat(
        slugs,
        process.env.GET_TEAMS_STATS!
      );
      
      return data;
    } catch (error) {
      throw error;
    }
  }
  private async getTeamStat(
    slugs: string[],
    draftUrl: string
  ): Promise<{
    data: TeamStatsCreationAttributes[];
    unfoundTeamSlugs: string[];
  }> {
    try {
      const unfoundTeamSlugs: string[] = [];
      const info: TeamStatsCreationAttributes[] = [];
      for (const slug of slugs) {
        const url = this.glueUrl(draftUrl, slug);

        const response = await fetch(url);
        const infoData = await response.json();
        if (infoData.length === 0) {
          unfoundTeamSlugs.push(slug);
          console.warn(`No data found for team slug: ${slug}`);
        }
        info.push(...infoData);
      }
      return { data: info.flat(), unfoundTeamSlugs };
    } catch (error) {
      throw error;
    }
  }
  private glueUrl(draftUrl: string, slug: string): string {
    const today = new Date();
    const pastDate = new Date();
    pastDate.setMonth(today.getMonth() - 6);

    const TODAY_DATA = this.formatDate(today);
    const PAST_DATA = this.formatDate(pastDate);
    return draftUrl
      .replace("%TEAM_SLUG%", slug)
      .replace("%TODAY_DATA%", TODAY_DATA)
      .replace("%PAST_DATA%", PAST_DATA);
  }
  private formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }
}

export function teamStatGetter(slugs: string[]): Promise<TeamStatsCreationAttributes[]> {
  const instance = new GetTeamStat();
  return instance.handleFetch(slugs);
}
