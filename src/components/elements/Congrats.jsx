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

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 3500);
  // }, []);

  return (
    <>
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
