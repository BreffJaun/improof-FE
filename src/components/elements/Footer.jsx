import { useNavigate } from "react-router-dom";
import efjm from "../../images/efjm_logo.png";
import { useContext, useState } from "react";

// STYLE
import "../../styles/logo.scss";
import Up from "../elements/Up.jsx";

// CONTEXT
import DarkModeContext from "../../context/darkModeContext.jsx";

const Footer = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  const navigate = useNavigate();

  return (
    <>
      <Up />
      <div className="logoContainer central">
        <div
          className={darkMode ? `efjm-dark` : `efjm-light bg-FAV`}
          onClick={() => navigate("/efjm")}
        >
          <img src={efjm} alt="efjm" />
        </div>
      </div>
    </>
  );
};

export default Footer;
