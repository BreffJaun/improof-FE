import { useNavigate } from "react-router-dom";

// ICONS
import { IoIosArrowUp as Upwards} from "react-icons/io" 

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
        <div className="up-icon central">
          <div onClick={goToTop} title="back to top">
            <Upwards className="fs15"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Up;