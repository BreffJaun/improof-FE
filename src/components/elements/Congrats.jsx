import { useEffect } from "react";
import "../../styles/logo.scss";
import logo from "../../images/improof_OR.png";
import { useNavigate } from "react-router-dom";

import "../../styles/congrats.scss";

const Congrats = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigate("/");
  //   }, 3500);
  // }, []);

  return (
    <>
      <div className="logoContainer ">
        <div className="logoL col">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="logoContainer services ">
        <div className="logoXL col congrats-right ">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="moto">
        <h1>
          Welcome <br />
          to <strong>improof</strong>
        </h1>
      </div>
      <div className="logoContainer congrats-left-second  ">
        <div className="logoXXL   col">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default Congrats;
