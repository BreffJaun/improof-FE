import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { host } from "./api/host.jsx";

// STYLES
import "./App.css";
import "./styles/aaa_mediascreens.scss"
import "./styles/general.scss";
import "./styles/fonts.scss";
import "./styles/elements.scss";
import "./styles/buttons.scss";
import "./styles/scrolling.scss";
import "./styles/projects.scss";

// COMPONENTEN
import Login from "./components/pages/Login.jsx";
import Registration from "./components/pages/Registration.jsx";
import Main from "./components/pages/Main.jsx";

// CONTEXT
import UserContext from "./context/userContext.jsx";
function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useContext(UserContext);
  const [modeTrigger, setModeTrigger] = useState(false)
  const mode = user?.meta?.darkMode;
  // const body = document.querySelector("body");
  // mode && body.classList.add(`bgG`);

  useEffect(() => {

    fetch(`${host}/users/checklogin`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          setUser(json.user);

          if (json.user?.meta?.loginCount === 1) {
            navigate("/congrats");
          }
        } else {
          navigate("/login");
        }
      });
  }, [modeTrigger]);


  return (
    <div className={mode ? `App bgG` : `App`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Main modeTrigger={modeTrigger} setModeTrigger={setModeTrigger}/>} />
        </Routes>
    </div>
  );
}

export default App;
