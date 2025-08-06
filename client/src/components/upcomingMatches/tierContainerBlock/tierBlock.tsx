import React from "react";
import type { MatchCardProps } from "../../../api/upcomingMatchesApi.ts/types";
import styles from "./tier.module.css";
import TierComponent from "../components/tierComponent/tierComponent";
import MatchCard from "../components/upcomingMatches";

const TierBlock: React.FC<{
  matches: MatchCardProps[];
  codeValues: string;
}> = ({ matches, codeValues }) => {
  return (
    <div className={styles.tierBlock}>
      <TierComponent codeValues={codeValues} />
      <div className={styles.matches}>
        <div className={styles.matchesTitle}>
          <div className={styles.time}>TIME</div>
          <div className={styles.match}>MATCH</div>
          <div className={styles.prediction}>PREDICTION</div>
        </div>
        {matches.map((match) => (
          <MatchCard match={match} />
        ))}
      </div>
    </div>
  );
};

export default TierBlock;
