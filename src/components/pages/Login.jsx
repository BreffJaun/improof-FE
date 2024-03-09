import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../elements/Footer.jsx";

// COMPONENTS
import { LogoL } from "../Logo.jsx";

import logoOr from "../../images/improof_OR.png";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({});
  const handleInput = (event) => {
    setLoginData({
      ...loginData,
      profile: {
        ...loginData.profile,
        [event.target.name]: event.target.value,
      },
    });
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendData = async () => {
      await fetch(`${host}/users/login`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(loginData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!json.status) {
            toast("invalid password or email", {
              hideProgressBar: "true",
              icon: () => <img src={logoOr} width="20" />,
            });
          } else {
            navigate("/");
          }
        });
    };
    sendData();
  };

  return (
    <div className="maxHH central">
      <div className="col">
        <div className="">
          <div className="mb2">
            <LogoL />
            <h3 className="c-O2 central  mt2">
              show your skills - get discovered
            </h3>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="col">
              <div className="mb2 col">
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  className="shadow-s"
                  onChange={handleInput}
                />
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  className="mt05 shadow-s"
                  onChange={handleInput}
                />
              </div>
              <button className={`bg-gO mb2`} type="submit">
                login
              </button>
              <div className="col central">
                <p>
                  Not registered yet?{" "}
                  <NavLink to="/registration">click here</NavLink>
                </p>
              </div>
              <div className="col central">
                <p>
                  Forgot your password?{" "}
                  <NavLink to="/forgottenpassword">click here</NavLink>
                </p>
              </div>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
