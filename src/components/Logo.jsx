import { useNavigate } from "react-router-dom";

// STYLE
import "../styles/logo.scss"


const LogoS = () => {
  const navigate = useNavigate()
  
  return (
    <div className="logoContainer">
      <div onClick={() => navigate("/")} className="logoS"></div>
    </div>
  );
};


const LogoL = () => {
  return (
    <div className="logoContainer">
      <div className="logoL"></div>
    </div>
  );
};


export {LogoS, LogoL};