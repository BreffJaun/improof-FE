import {useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../elements/Footer.jsx";


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
            toast.error(json.error, toastOptions);
          } else {
            navigate("/")
          }
        });
    };
    sendData();
  }


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>login</p>
          <p>{loginData.email}</p>
          <p>{loginData.password}</p>
          <input type="text" name="email" placeholder="email" onChange={handleInput}/>
          <input type="password" name="password" placeholder="password" onChange={handleInput}/>
          <button type="submit">submit</button>
        </div>
        <div>
          <p>Not registered yet? 
            <NavLink to="/registration">click here</NavLink>
          </p>
        </div>
      </form>
      <ToastContainer />
      <Footer/>
    </div>
  );
};

export default Login;