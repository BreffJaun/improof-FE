import {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../elements/Footer.jsx";

// COMPONENTS
import { LogoL } from "../Logo.jsx";


const Login = () => {

  const navigate = useNavigate(); 

  const [loginData, setLoginData] = useState({});

  const handleInput = (event) => {
    setLoginData({...loginData, profile:{...loginData.profile, [event.target.name]: event.target.value}});
  }

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    theme: "dark",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendData = async () => {
      await fetch(`${host}/users/login`, {
        credentials:"include",
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if(!json.status) {
            toast.error("invalid password", toastOptions);
          } else {
            navigate("/")
          }
        });
    };
    sendData();
  }


  return (
    <>
      <div className="mb2 mt2">
        <LogoL/>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="central col">

          {/* <p>{loginData.email}</p>
          <p>{loginData.password}</p> */}

          <div className="mb2 col">
            <input 
              type="text" 
              name="email" 
              placeholder="email" 
              onChange={handleInput}
            />
            <input
              type="password" 
              name="password" 
              placeholder="password" 
              onChange={handleInput}
            />
          </div>

          <button className={`bg-FAV mb2`} type="submit">login</button>
          <div className="col central">
            <p>Not registered yet?</p>
            <p><NavLink to="/registration">click here</NavLink></p> 
          </div>
        </div>
      </form>
      <ToastContainer />
      <Footer/>
    </>
  );
};

export default Login;