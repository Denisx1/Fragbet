import { useEffect, useState } from "react";
import type { MatchCardProps } from "../../../api/upcomingMatchesApi.ts/types";
import style from "./style.module.css";
import { calculateTimeLeft } from "./utils";
type TimeToStartProps = Pick<
  MatchCardProps,
  "start_date" | "ai_predictions"
> & {
  page: string;
};
const TimeToStart: React.FC<TimeToStartProps> = ({
  start_date,
  ai_predictions,
  page = "matchId",
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(start_date));
  const time = new Date(start_date);
  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(start_date));
    }, 1000);

    return () => clearInterval(timer);
  }, [start_date]);
  return (
    <>
      {page === "main" ? (
        <div className={style.timeToStartMain}>{formattedTime}</div>
      ) : (
        <div className={style.timeToStart}>
          {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
          <div className={style.prediction}>
            {ai_predictions?.prediction_team1_score >
            ai_predictions?.prediction_team2_score
              ? 1
              : 2}
          </div>
        </div>
      )}
    </>
  );
};

export default TimeToStart;
