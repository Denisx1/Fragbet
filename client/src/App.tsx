import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

import { PageMetaProvider } from "./components/title/titleContext";
import AppRoutes from "./routes";

// import AppRoutes from "./routes";

const App: React.FC = () => {
  return (
    <PageMetaProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </PageMetaProvider>
  );
};

export default App;
