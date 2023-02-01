import {useState, useEffect, useContext} from "react";
import { NavLink, useNavigate } from "react-router-dom";



import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Login = () => {

  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({});

  const handleInput = (event) => {
    setLoginData({...loginData, [event.target.name]: event.target.value});
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
          <input type="text" name="password" placeholder="password" onChange={handleInput}/>
          <button type="submit">submit</button>
        </div>
        <div>
          <p>Not registered yet? 
            <NavLink to="/registration">click here</NavLink>
          </p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;