import React from "react";
import { type MatchCardProps } from "../../../api/upcomingMatchesApi.ts/types";
import styles from "./UpcomingMatches.module.css";
import { useNavigate } from "react-router-dom";

const MatchCard: React.FC<{ match: MatchCardProps; layout: string }> = ({
  match,
  layout,
}) => {
  const navigation = useNavigate();

  const time = new Date(match.start_date);
  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  const habdleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    navigation(`/matches/Match/${match.id}`, { state: { match } });
  };
  return (
    <div className={styles.matchCard} onClick={habdleClick}>
      <div className={styles.firstBlock}>
        <div>{formattedTime}</div>

        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              style={{
                color: i < Number(match.stars) ? "gold" : "#ccc",
                fontSize: "9px",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </div>
      <div className={styles.teams}>
        <div className={styles.teamName}>
          <div className={styles.team1Name} title={match.team1?.name}>
            {match.team1?.name}
          </div>
        </div>

        <div className={styles.boType}>Bo{match.bo_type}</div>

        <div className={styles.teamName}>
          <div className={styles.team2Name} title={match.team2?.name}>
            {match.team2?.name}
          </div>
        </div>
      </div>

      <div className={styles.prediction}>
        <div className={styles.matchPredictedInfo}>
          <div className={styles.winnerNumber}>
            {match.ai_predictions?.prediction_team1_score >
            match.ai_predictions?.prediction_team2_score
              ? 1
              : 2}
          </div>

          {layout === "single-column" && (
            <div className={styles.matchPredictedScore}>
              {match.ai_predictions?.prediction_team1_score} -
              {match.ai_predictions?.prediction_team2_score}
            </div>
          )}
        </div>
      </div>
    </div>
    // <div>
  );
};

export default MatchCard;
