import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./context/userContext.jsx";
import { TriggerContextProvider } from "./context/triggerContext.jsx";
import { DarkModeProvider } from "./context/darkModeContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TriggerContextProvider>
      <DarkModeProvider>
        <UserContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UserContextProvider>
      </DarkModeProvider>
    </TriggerContextProvider>
  </React.StrictMode>
);
