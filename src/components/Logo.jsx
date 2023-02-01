import { useNavigate } from "react-router-dom";

// STYLE
import "../styles/logo.scss"
import "../styles/colors.scss"


const LogoS = () => {
  const navigate = useNavigate()
  
  return (
    <div className="logoContainer">
      <div onClick={() => navigate("/")} className="logoS bg-FAV"></div>
    </div>
  );
};


const LogoL = () => {
  return (
    <div className="logoContainer">
      <div className="logoL bg-FAV"></div>
    </div>
  );
};
 

export {LogoS, LogoL};