import { useContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

// STYLES
import "./App.css";
import "./styles/general.scss";
import "./styles/fonts.scss";
import "./styles/elements.scss";

// CONTEXT
import LightModeContext from "./context/lightModeContext.jsx";

// COMPONENTEN
import Login from "./components/pages/Login.jsx";
import Registration from "./components/pages/Registration.jsx";
import Main from "./components/pages/Main.jsx";

function App() {
  const [lightMode, setLightMode] = useContext(LightModeContext);
  const body = document.querySelector("body");
  body.classList.add(!lightMode ? `body-dark` : `body-light`);

  const [count, setCount] = useState(0);
  return (
    <div className={!lightMode ? `App-dark` : `App-light`}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
