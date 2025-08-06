import { useEffect } from "react";
import { usePageMeta } from "../components/title/titleContext";

const PlayerPage: React.FC = () => {
  const { setMeta } = usePageMeta();
  
    useEffect(() => {
      setMeta("Players", "Выберите Players в навигации для просмотра игроков.");
    }, [setMeta]);
  return (
    <div>
      <h1>Players</h1>
      <p>Выберите "Players" в навигации для просмотра игроков.</p>
    </div>
  );
};

export default PlayerPage;