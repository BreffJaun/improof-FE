import { useNavigate } from "react-router-dom";
import efjm from "../../images/efjm_logo.png"

import { useContext } from "react";
import UserContext from "../../context/userContext.jsx";


// STYLE
import '../../styles/logo.scss'
import Up from "../elements/Up.jsx"


const Footer = () => {
  const [user, setUser] = useContext(UserContext)
  const bg = user.meta.colorTheme[1]

  const navigate = useNavigate()

  return (
    <>
    <Up />
    <div className="logoContainer central">
      <div 
      className={`efjm ${bg}`}
      onClick= { ()=> navigate("/efjm")}>
        <img src={efjm} alt="efjm" />
      </div>
      </div>
    </>
  );
};

export default Footer;