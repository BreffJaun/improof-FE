import React from "react";
import "../../styles/congrats.scss";
import logo from "../../images/improof_OR.png";

const Congrats = () => {
  return (
    <>
      <div class="logoContainer mt2">
        <div class="logoL col">
          <img src={logo} alt="logo" />
          {/* <img src="/src/images/improof_OR.png" alt="improof-logo"> */}
        </div>
      </div>
      <div class="logoContainer mt2">
        <div class="logoL col">
          <img src={logo} alt="logo" />
          {/* <img src="/src/images/improof_OR.png" alt="improof-logo"> */}
        </div>
      </div>{" "}
      <div class="logoContainer">
        <div class="logoL col">
          <img src={logo} alt="logo" />
          {/* <img src="/src/images/improof_OR.png" alt="improof-logo"> */}
        </div>
      </div>{" "}
      <div class="logoContainer">
        <div class="logoM col">
          <img src={logo} alt="logo" />
          {/* <img src="/src/images/improof_OR.png" alt="improof-logo"> */}
        </div>
      </div>
    </>
  );
};

export default Congrats;
