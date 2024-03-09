import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// COMPONENTS
import { LogoM } from "../Logo.jsx";
import logoOr from "../../images/improof_OR.png";

const ForgottenPassword = () => {
  const navigate = useNavigate();

  const INITIAL = {
    email: "",
  };

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
  };

  const [email, setEmail] = useState(INITIAL);

  const handleInput = (event) => {
    setEmail({ ...email, email: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const sendData = async () => {
      await fetch(`${host}/users/forgottenpassword`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(email),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((json) => json.json())
        .then((data) => {
          if (data.error) {
            toast.error("There is no user with this email!", toastOptions);
          }
          if (data.message) {
            navigate("/");
          }
        });
    };
    sendData();
  };

  return (
    <div className="maxHH central">
      <div>
        <div className="mb2">
          <LogoM />
        </div>
        <p className="central c-FAV mb05">Reset your password</p>

        <form onSubmit={handleSubmit}>
          <div className="col">
            <input
              type="email"
              name="email"
              placeholder="Enter your email so we can send you an email to reset your password"
              required
              className="mb05 shadow-s"
              onChange={handleInput}
            />
          </div>
          <div className="central mb2 mt2">
            <button type="submit" className="bg-gO">
              Send reset E-Mail
            </button>
          </div>
          <div className="central">
            <p>
              You remembered your password?{" "}
              <span>
                <NavLink to="/login">Login</NavLink>
              </span>
            </p>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgottenPassword;
