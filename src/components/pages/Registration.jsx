import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// COMPONENTS
import { LogoL } from "../../components/Logo";
import logoOr from "../../images/improof_OR.png";
import Footer from "../elements/Footer.jsx";

const Registration = () => {
  const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
  };

  const [registrationData, setRegistrationData] = useState({ profile: {} });

  const handleInput = (event) => {
    setRegistrationData({
      ...registrationData,
      profile: {
        ...registrationData.profile,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleTalent = (event) => {
    setRegistrationData({
      ...registrationData,
      profile: {
        ...registrationData.profile,
        isTalent: true,
        isRecruiter: false,
      },
    });
  };
  const handleRecruiter = (event) => {
    setRegistrationData({
      ...registrationData,
      profile: {
        ...registrationData.profile,
        isRecruiter: true,
        isTalent: false,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sendRegistrationData = async () => {
      await fetch(`${host}/users/add`, {
        method: "POST",
        body: JSON.stringify(registrationData),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (!json.status) {
            toast(`${json.errors[0].msg}`, {
              hideProgressBar: "true",
              icon: () => <img src={logoOr} width="20" />,
            });
          } else {
            toast("We sent you an email for verification.", {
              hideProgressBar: "true",
              icon: () => <img src={logoOr} width="20" />,
            });
            setTimeout(() => navigate("/login"), 8000);
          }
        });
    };

    if (
      registrationData.profile.password !==
      registrationData.profile.confirmPassword
    ) {
      toast("confirm password an password are not equal", {
        hideProgressBar: "true",
        icon: () => <img src={logoOr} width="20" />,
      });
    } else if (
      !registrationData.profile.isRecruiter &&
      !registrationData.profile.isTalent
    ) {
      toast("Are you a talent or a recruiter?", {
        hideProgressBar: "true",
        icon: () => <img src={logoOr} width="20" />,
      });
    } else {
      sendRegistrationData();
    }
  };

  return (
    <div className="maxHH central col">
      <div className="">
        <div className="mb2 mt2">
          <LogoL />
        </div>
        <p className="central c-FAV mb1">create your account</p>

        <form onSubmit={handleSubmit}>
          <div className="col">
            <input
              type="text"
              name="firstName"
              placeholder="first name"
              required
              className="mb05 shadow-s"
              onChange={handleInput}
            />
            <input
              type="text"
              name="lastName"
              placeholder="last name"
              required
              className="mb05 shadow-s"
              onChange={handleInput}
            />
            <input
              type="email"
              name="email"
              placeholder="email"
              required
              className="mb05 shadow-s"
              onChange={handleInput}
            />
          </div>
          <div className="col mb2 mt3">
            <input
              title="min. 8 characters & at least 1 lowercase, 1 uppercase, 1 special character & 1 number"
              type="password"
              name="password"
              placeholder="password"
              required
              className="mb05 shadow-s"
              onChange={handleInput}
            />
            <input
              title="repeat your password"
              type="password"
              name="confirmPassword"
              placeholder="confirm password"
              required
              className="mb05 shadow-s"
              onChange={handleInput}
            />
          </div>
          <div className="central">
            <div className="mb05 flex">
              <label className="mr05">i am a talent</label>
              <input
                title="I want to share my work with the world"
                type="radio"
                name="whoAmI"
                value="isTalent"
                onChange={handleTalent}
              />
            </div>
            <div className="mb05 ml2 flex">
              <input
                title="I am looking for new talents"
                type="radio"
                name="whoAmI"
                value="isRecruiter"
                onChange={handleRecruiter}
              />
              <label className="ml05">i am a recruiter</label>
            </div>
          </div>
          <div className="central mb2 mt2">
            <button type="submit" className="bg-FAV">
              register
            </button>
          </div>
          <div className="central">
            <p>
              already registered?
              <NavLink to="/login">login here</NavLink>
            </p>
          </div>
        </form>
        <ToastContainer />
        <Footer/>
      </div>
    </div>
  );
};

export default Registration;
