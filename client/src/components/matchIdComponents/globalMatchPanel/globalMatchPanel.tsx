import React from "react";
import style from "./styles.module.css";
import type { MatchCardProps } from "../../../api/upcomingMatchesApi.ts/types";
const GlobalMatchPanel: React.FC<{ match: MatchCardProps }> = ({ match }) => {
  console.log(match);
  return (
    <div className={style.globalMatchPanel}>
      <div className={style.globalMatch}>
        <div className={style.matchStatus}>
          <div className={style.matchesTitle}>
            <div className={style.timeToStart}></div>
            <div className={style.opponents}>
              <div className={style.team1Name}>
                <div className={style.team1nickName}>{match.team1?.name}</div>
                <div className={style.team1Image}>
                  <img src={match.team1?.image_url} id="team1Image" />
                </div>
              </div>
              <div className={style.vs}>BO</div>
              <div className={style.team2Name}>
                <div className={style.team2Image}>
                  <img src={match.team2?.image_url} id="team1Image" />
                </div>
                <div className={style.team2nickName}>
                  <div className={style.name}>{match.team2?.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.mapMenu}></div>
    </div>
  );
};

export default GlobalMatchPanel;
