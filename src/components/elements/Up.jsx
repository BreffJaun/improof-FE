import { useNavigate } from "react-router-dom";
import efjm from "../../images/efjm_logo.png";
import UserContext from "../../context/userContext.jsx";

// STYLE
import "../../styles/logo.scss";

// CONTEXT
import DarkModeContext from "../../context/darkModeContext.jsx";
import { useContext } from "react";
const Up = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  const goToTop = () => {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Chrome, Firefox, IE, Opera
  };

  return (
    <>
      <div
        className={darkMode ? `central  bo-DARK rel` : `central bo-DARK rel`}
      >
        <div className="up-icon">
          <div className="central " onClick={goToTop} title="back to top">
            <h1>^</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Up;
