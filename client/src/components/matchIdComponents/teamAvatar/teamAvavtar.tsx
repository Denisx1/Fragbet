import React, { useState } from "react";
import style from "./style.module.css";

export interface TeamAvavtarProps {
  teamName: string;
  imageUrl: string;
}
const TeamAvatar: React.FC<TeamAvavtarProps> = ({ teamName, imageUrl }) => {
  const [imageFailed, setImageFailed] = useState(false);
  const handleError = () => {
    setImageFailed(true);
  };
  if (!imageUrl || imageFailed) {
    // Показываем первую букву названия команды
    return <div className={style.fallbackAvatar}>
        <span>{teamName.charAt(0).toUpperCase()}</span>
    </div>;
  }

  return (
    <div className={style.avatarContainer}>
      <img
        src={imageUrl}
        alt={teamName}
        className={style.avatar}
        onError={handleError}
      />
    </div>
  );
};
export default TeamAvatar;
