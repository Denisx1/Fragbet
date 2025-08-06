import type { MatchCardProps } from "./types";

/* eslint-disable no-useless-catch */
export interface Tier {
  lowTier: {
    tier_id: number;
    tierName: string;
    codes: {
      codeValue: string;
    }[];
    matches: MatchCardProps[];
  };
  highTier: {
    tier_id: number;
    tierName: string;
    codes: {
      codeValue: string;
    }[];
    matches: MatchCardProps[];
  };
}
export async function getUpcomingMatches(): Promise<Tier> {
  try {
    const response = await fetch("http://localhost:7095/tier/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
