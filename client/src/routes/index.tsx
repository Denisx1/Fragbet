import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/homePage";

import { MatchPage } from "../pages/upcomingMatches/matchPage";
import PlayerPage from "../pages/playerPage";
import TeamPage from "../pages/teamPage";
import StatPage from "../pages/statPage";
import Layout from "../components/layout/layout/layout";
import MatchIdPage from "../pages/matchById/matchIdPage";

/**
 * The main set of routes for the application.
 *
 * This component is the top-level routes configuration for the app, and is
 * responsible for rendering the correct page component based on the current
 * URL.
 *
 * @returns The main set of routes for the application.
 */
const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="stat" element={<StatPage />} />
      <Route path="matches" element={<MatchPage />} />
      <Route path="players" element={<PlayerPage />} />
      <Route path="teams" element={<TeamPage />} />
      <Route path="matches/Match/:id" element={<MatchIdPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
