import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { host } from "../../api/host.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// COMPONENTS
import { LogoM } from "../Logo.jsx";
import logoOr from "../../images/improof_OR.png";

const SetNewPassword = () => {
  const navigate = useNavigate();
  // const { token } = useParams();
  // console.log("doc.cookie: ", document.cookie);

  // =========

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
  };
  const INITIAL = {
    password: "",
    confirmPassword: "",
  };

  const [newData, setNewData] = useState(INITIAL);

  const handleInput = (event) => {
    setNewData({ ...newData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newData.password !== newData.confirmPassword) {
      toast.error("Passwörter stimmen nicht überein", toastOptions);
      return;
    }
    const sendData = async () => {
      await fetch(`${host}/users/setnewpassword`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((json) => json.json())
        .then((data) => {
          if (data.error) {
            toast.error(
              "Email is not verified to change password",
              toastOptions
            );
          } else if (data.redirectUrl) {
            toast.info("Password change SUCCESSFULLY", toastOptions);
            navigate(`/${data.redirectUrl}`);
          } else {
            toast.info("Password change SUCCESSFULLY", toastOptions);
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
              type="password"
              name="password"
              placeholder="Neues Passwort"
              required
              className="mb05 shadow-s"
              onChange={handleInput}
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Passwort bestätigen"
              required
              className="mb05 shadow-s"
              onChange={handleInput}
            />
          </div>
          <div className="central mb2 mt2">
            <button type="submit" className="bg-gO">
              Set new password
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SetNewPassword;
