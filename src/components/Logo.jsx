import { useNavigate } from "react-router-dom";

// STYLE
import "../styles/logo.scss"
import "../styles/colors.scss"
import logo from "../images/improof_OR.png"


const LogoS = () => {
  const navigate = useNavigate()
  return (
    <div className="logoContainer mt2">
      <div onClick={() => navigate("/")} className="logoS col">
        <img src={logo} alt="improof-logo"/>
        <h1 className="c-FAV">improof</h1>
      </div>
    </div>
  );
};

const LogoL = () => {
  return (
    <div className="logoContainer">
      <div className="logoL col">
        <img src={logo} alt="improof-logo"/>
        <h1 className="c-FAV">improof</h1>
      </div>
    </div>
  );
};

export {LogoS, LogoL};