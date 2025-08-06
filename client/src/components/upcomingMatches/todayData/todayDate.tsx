import React from "react";
import styles from "./date.module.css";

const TodayData: React.FC = () => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
  };

  const formatted = new Date().toLocaleDateString("en-US", options);
  return (
    <div className={styles.dateDivider}>
      <span className={styles.dateDividerText}>Today, {formatted}</span>
    </div>
  );
};

export default TodayData;
