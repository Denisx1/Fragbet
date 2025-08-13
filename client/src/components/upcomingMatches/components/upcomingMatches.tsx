import React from "react";
import { type MatchCardProps } from "../../../api/upcomingMatchesApi.ts/types";
import styles from "./UpcomingMatches.module.css";
import { useNavigate } from "react-router-dom";
import TimeToStart from "../../matchIdComponents/timeToStart/timeToStart";
import TeamBlock from "../../matchIdComponents/teamBlock/teamName";
import Stars from "./stars/starts";

const MatchCard: React.FC<{ match: MatchCardProps; layout: string }> = ({
  match,
  layout,
}) => {
  const navigation = useNavigate();

  const habdleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    navigation(`/matches/Match/${match.id}`, { state: { match } });
  };
  return (
    <div className={styles.matchCard} onClick={habdleClick}>
      <div className={styles.timeAndOpponents}>
        <div className={styles.time}>
          <TimeToStart
            start_date={match.start_date}
            ai_predictions={match.ai_predictions}
            page="main"
          />
          <div className={styles.starsContainer}>
            <Stars stars={match.stars} />
          </div>
        </div>

        <div className={styles.opponents}>
          <TeamBlock
            teamName={match.team1?.name}
            imageUrl={match.team1?.image_url}
            position="left"
          />
          <div className={styles.boType}>
            <div className={styles.trapezoid}>Bo{match.bo_type}</div>
          </div>
          <TeamBlock
            teamName={match.team2?.name}
            imageUrl={match.team2?.image_url}
            position="right"
          />
        </div>
        <div className={styles.prediction}>
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
