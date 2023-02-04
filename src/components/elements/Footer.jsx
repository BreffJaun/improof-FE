import { useNavigate } from "react-router-dom";
import efjm from "../../images/efjm_logo.png"


// STYLE
import '../../styles/logo.scss'


const Footer = () => {

  const navigate = useNavigate()

  return (
    <div className="logoContainer central">
      <div 
      className="efjm bg-FAV"
      onClick= { ()=> navigate("/efjm")}>
        <img src={efjm} alt="efjm" />
      </div>
    </div>
  );
};

export default Footer;