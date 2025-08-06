import React, { useEffect } from "react";

import { usePageMeta } from "../components/title/titleContext";

const StatPage: React.FC = () => {
  const { setMeta } = usePageMeta();

  useEffect(() => {
    setMeta("Статистика", "Здесь будет основной контент статистики");
  }, [setMeta]);

  return (
      <p>Здесь будет основной контент статистики</p>
   
  );
};

export default StatPage;
