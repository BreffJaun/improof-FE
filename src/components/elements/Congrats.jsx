import { useEffect } from "react";
import "../../styles/congrats.scss";
import logo from "../../images/improof_OR.png";
import { useNavigate } from "react-router-dom";
import logoBlue from "../../images/improof_BL.png";
import logoOrange from "../../images/improof_OR.png";
import logoPink from "../../images/improof_PI.png";
import logoYellow from "../../images/improof_YE.png";
import logoPurple from "../../images/improof_PU.png";

const Congrats = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 7500);
  }, []);

  return (
    <>
      <h1>Welcome to improof!</h1>
      <h2>
        The social media platform that supports you with the documentation of
        your projects and gives you fair chances in being discovered by
        companies and recruiters.
      </h2>
      <div className="congrats_container">
        <div className="logo_blue">
          <img src={logoBlue} alt="logo" />
        </div>
        <div className="logo_lightblue">
          <img src={logoBlue} alt="logo" />
        </div>
        <div className="logo_orange">
          <img src={logoOrange} alt="logo" />
        </div>
        <div className="logo_purple">
          <img src={logoPurple} alt="logo" />
        </div>
        <div className="logo_pink">
          <img src={logoPink} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default Congrats;
