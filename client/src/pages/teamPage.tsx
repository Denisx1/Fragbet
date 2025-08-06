import { useEffect } from "react";
import { usePageMeta } from "../components/title/titleContext";

const TeamPage: React.FC = () => {
  const { setMeta } = usePageMeta();

  useEffect(() => {
    setMeta("Teams", "Выберите Teams в навигации для просмотра команд.");
  }, [setMeta]);
  return (
    <div>
      <h1>Teams</h1>
      <p>Выберите "Teams" в навигации для просмотра команд.</p>
    </div>
  );
};

export default TeamPage;
