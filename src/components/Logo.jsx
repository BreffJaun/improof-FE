import { useNavigate } from "react-router-dom";

// STYLE
import "../styles/logo.scss"
import "../styles/colors.scss"


const LogoS = () => {
  const navigate = useNavigate()
  
  return (
    <div className="logoContainer">
      <div onClick={() => navigate("/")} className="logoS bgG"></div>
    </div>
  );
};


const LogoL = () => {
  return (
    <div className="logoContainer">
      <div className="logoL bgG"></div>
    </div>
  );
};
 

export {LogoS, LogoL};