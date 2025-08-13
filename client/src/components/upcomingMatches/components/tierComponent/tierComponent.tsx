import React from "react";
import styles from "./tier.module.css";

const TierComponent: React.FC<{ codeValues: string }> = ({ codeValues }) => {
  console.log(codeValues);
  
  return (
    <div className={styles.tierContainer}>
      <div className={styles.tierCode}>{codeValues} - tier</div>
    </div>
  );
};

export default TierComponent;
