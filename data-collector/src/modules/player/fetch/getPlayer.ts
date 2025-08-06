class FetchPlayer {
  public async getPlayer(playerSlug: string) {
    try {
      const response = await fetch(
        process.env.GET_PLAYER_INFO!.replace("%PLAYER_NAME%", playerSlug)
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export function fetchPlayerFromBo3(playerSlug: string): Promise<void> {
  const fetchPlayer = new FetchPlayer();
  return fetchPlayer.getPlayer(playerSlug);
}
