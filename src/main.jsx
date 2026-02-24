import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { HashRouter } from "react-router-dom";

const repoName = "/appointment-management-system"; // GitHub repo name

import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={repoName}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
