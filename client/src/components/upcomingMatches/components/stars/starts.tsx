import React from "react";
import style from "./style.module.css";
const Stars: React.FC<{ stars: number }> = ({ stars }) => {
  return (
    
    <div className={style.stars}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          style={{
            color: i < Number(stars) ? "gold" : "#ccc",
            fontSize: "9px",
          }}
        >
          ★
        </span>
      ))}
      </div> 
      
  );
};
export default Stars;