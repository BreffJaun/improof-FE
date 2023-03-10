import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/userContext.jsx";


// STYLE
import '../../styles/logo.scss'
import Up from "../elements/Up.jsx"
import efjm from "../../images/efjm_logo_A60.png"


const Footer = () => {
  const [user, setUser] = useContext(UserContext);
  const color = user?.meta?.colorTheme[0]
  const bg = user?.meta?.colorTheme[1]
  const navigate = useNavigate()

  return (
    <>
    <div className="max bo-DARK"></div>
      <div className="logoContainer central">
        <div 
        className={`efjm`}
        onClick= { ()=> navigate("/efjm")}>
          <img src={efjm} alt="efjm" />
        </div>
      </div>
      </>
  );
};

export default Footer;