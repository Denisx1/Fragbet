import React from "react";
import GlobalMatchPanel from "../../components/matchIdComponents/globalMatchPanel/globalMatchPanel";
import { useLocation } from "react-router-dom";
import type { MatchCardProps } from "../../api/upcomingMatchesApi.ts/types";
const MatchIdPage: React.FC = () => {
  const location = useLocation();
  const { match }: { match: MatchCardProps } = location.state;
  return (
    <>
      <GlobalMatchPanel match={match} />
    </>
  );
};

export default MatchIdPage;
