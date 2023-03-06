import { useEffect } from "react";
import { useContext } from "react";
import UserContext from "../../context/userContext.jsx";


import "../../styles/congrats.scss";


import { useNavigate } from "react-router-dom";
import Blue from "../../images/improof_BL.png";
import LB from "../../images/improof_LB.png"
import Orange from "../../images/improof_OR.png";
import Pink from "../../images/improof_PI.png";
import logoYellow from "../../images/improof_YE.png";
import Purple from "../../images/improof_PU.png";
import { host } from "../../api/host.jsx";


const Congrats = () => {
  const [user, setUser] = useContext(UserContext)
  const width = window.innerWidth
  const height = window.innerHeight

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
        const setFirstLogin = async () => {
          await fetch(`${host}/users/firstlogin/${user._id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              userId: user._id,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => null);
        }
        setFirstLogin()
      navigate("/");
    }, 5000);
  }, []);

  return (
    <div className="congrats-container col mb2">

      <div className="logos-container" >
        <div className="bl">
          <img src={Blue} alt="logo" />
        </div>
        <div className="lb">
          <img src={LB} alt="logo" />
        </div>
        <div className="pu">
          <img src={Purple} alt="logo"/>
        </div>
        <div className="pi">
          <img src={Pink} alt="logo"/>
        </div>
        <div className="center o">
          <img src={Orange} alt="logo"/>
        </div>
      </div>

      <div className="congrats-text-container col">
        <h1>Congratulation!</h1>
      </div>

    </div >
  );
};

export default Congrats;
