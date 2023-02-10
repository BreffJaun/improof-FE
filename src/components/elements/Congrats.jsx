import { useEffect } from "react";
import "../../styles/logo.scss";
import logo from "../../images/improof_OR.png";
import { useNavigate } from "react-router-dom";

const Congrats = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 3500);
  }, []);

  return (
    <>
      <div className="logoContainer congrats-left">
        <div className="logoL col">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="logoContainer congrats-right">
        <div className="logoXl col">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="moto">
        <h1>
          Welcome <br />
          to <strong>improof</strong>
        </h1>
      </div>
      <div className="logoContainer congrats-left-second">
        <div className=" col">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </>
  );
};

export default Congrats;
