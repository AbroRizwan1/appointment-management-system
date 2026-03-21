import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import SidebarContext from "./Context/SidebarContext.jsx";
// import { HashRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename="/appointment-management-system">
      <SidebarContext>
        <App />
      </SidebarContext>
    </BrowserRouter>
  </StrictMode>,
);
