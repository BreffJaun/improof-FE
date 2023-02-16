import { useEffect } from "react";
import "../../styles/congrats.scss";
import logo from "../../images/improof_OR.png";
import { useNavigate } from "react-router-dom";

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
        <div className="logoXXL-congrats one col">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="logoContainer ">
        <div className="logoXXL-congrats oneOne col">
          <img src={logo} alt="logo" />
        </div>
      </div>
      {/* <div className="logoContainer">
        <div className="logoXXL-congrats two col">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="moto">
        <h1>
          Welcome <br />
          to <strong>improof</strong>
        </h1>
      </div>
      <div className="logoContainer ">
        <div className="logo-congrats three col">
          <img src={logo} alt="logo" />
        </div>
      </div>
      <div className="logoContainer">
        <div className="logo-congrats  four col">
          <img src={logo} alt="logo" />
        </div>
      </div>{" "}
      <div className="logoContainer">
        <div className="logoXXL-congrats col five">
          <img src={logo} alt="logo" />
        </div>
      </div> */}
    </>
  );
};

export default Congrats;
