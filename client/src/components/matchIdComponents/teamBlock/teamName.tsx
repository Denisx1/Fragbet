import React from "react";
import style from "./style.module.css";
import TeamAvatar from "../teamAvatar/teamAvavtar";
export interface TeamNickNameProps {
  teamName: string;
  imageUrl: string;
  position: string;
}
const TeamBlock: React.FC<TeamNickNameProps> = ({
  teamName,
  imageUrl,
  position,
}) => {
  const upperCase: string = teamName.toUpperCase();
  const isLeft = position === "left";
  return (
    <>
      {isLeft ? (
        <>
          <div className={`${style.nameBlock} ${style.left}`}>
            <span >{upperCase}</span>
          </div>
          <TeamAvatar teamName={teamName} imageUrl={imageUrl} />
        </>
      ) : (
        <>
          <TeamAvatar teamName={teamName} imageUrl={imageUrl} />
          <div className={`${style.nameBlock} ${style.right}`}>
            <span>{upperCase}</span>
          </div>
        </>
      )}
    </>
  );
};
export default TeamBlock;
