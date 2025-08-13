import React from "react";
import style from "./styles.module.css";
import type { MatchCardProps } from "../../../api/upcomingMatchesApi.ts/types";
import TeamBlock from "../teamBlock/teamName";
import TimeToStart from "../timeToStart/timeToStart";
import MapMenu from "../mapMenu/mapNenu";

const GlobalMatchPanel: React.FC<{ match: MatchCardProps }> = ({ match }) => {
  return (
    <div className={style.globalMatchPanel}>
      <div className={style.globalMatch}>
        <div className={style.matchStatus}>
          <div className={style.matchesTitle}>
            <TimeToStart
              start_date={match.start_date}
              ai_predictions={match.ai_predictions}
              page="matchId"
            />

            <div className={style.opponents}>
              <TeamBlock
                teamName={match.team1?.name}
                imageUrl={match.team1?.image_url}
                position="left"
              />
              <div className={style.boType}>
                <div className={style.trapezoid}>Bo{match.bo_type}</div>
              </div>
              <TeamBlock
                teamName={match.team2?.name}
                imageUrl={match.team2?.image_url}
                position="right"
              />
            </div>
          </div>
        </div>
      </div>

      <MapMenu bo_type={match.bo_type} />
    </div>
  );
};

export default GlobalMatchPanel;
