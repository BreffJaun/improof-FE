import { useNavigate } from "react-router-dom";
import efjm from "../../images/efjm_logo.png"



// STYLE
import '../../styles/logo.scss'


const Up = () => {

  const navigate = useNavigate()

  const goToTop = () => {
    document.body.scrollTop = 0;              // Safari
    document.documentElement.scrollTop = 0;   // Chrome, Firefox, IE, Opera
  }

  return (
    <>
      <div className="bo-DARK central rel">

        <div className="up-icon">
          <div className="central" onClick={goToTop} title="back to top">
            <h1>^</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Up;