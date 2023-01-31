import { useNavigate } from "react-router-dom";


// STYLE
import '../styles/logo.scss'


const Footer = () => {

  const navigate = useNavigate()

  return (
    <div className="logoContainer">
      <div 
      className="efjm"
      onClick= { ()=> navigate("/efjm")}>efjm</div>
    </div>
  );
};

export default Footer;