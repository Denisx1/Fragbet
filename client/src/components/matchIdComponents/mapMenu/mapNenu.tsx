import React from "react";
import style from "./styles.module.css";
import type { MatchCardProps } from "../../../api/upcomingMatchesApi.ts/types";

type TimeToStartProps = Pick<MatchCardProps, "bo_type">;
const MapMenu: React.FC<TimeToStartProps> = ({ bo_type }) => {
  const bo_typeNumber = Number(bo_type);
  console.log(bo_typeNumber);

  return (
    <div className={style.mapMenuBlock}>
      <div className={style.mapMenu}>
        {Array.from({ length: bo_typeNumber || 0 }, (_, i) => (
          <div key={i} className={style.map}>
            Map{i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};
export default MapMenu;
