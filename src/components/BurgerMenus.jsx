import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// STYLE
import '../styles/burgermenu.scss'

// ICONS
import { IoIosLogOut } from "react-icons/io"
import { MdOutlinePerson } from "react-icons/md"
import { MdPeopleOutline as Community } from "react-icons/md"
import { AiOutlineAppstoreAdd as Projects } from "react-icons/ai"
import { AiOutlinePlusSquare as NewProject } from "react-icons/ai"
import { AiOutlineStar as Star } from "react-icons/ai"
import { MdOutlineClose as X} from "react-icons/md"

// CONTEXT
import UserContext from "../context/userContext";


const BurgerMenuTalent = ({setShowMenu, showMenu}) => {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)

  return (
    <div className="burger-container">
      <div>
        <div >
          <p className="c-A80">talent menu</p>
        </div>
        <div onClick={()=> setShowMenu(!showMenu)} className="mb2">
          lightmode/darkmode
        </div>
        <div onClick={() =>{
          console.log(event.target);
          setShowMenu(!showMenu)
        }
        }  className="mb15 col central">
          <button className="mb05" onClick={() => navigate(`/userdetails/${user._id}`)}>< MdOutlinePerson /> my profile</button>
          <button className="mb05" onClick={ ()=> navigate("/createproject")}><NewProject/>new project</button>
          <button className="mb05" onClick={ ()=> navigate("/myprojects")}><Projects/> my projects</button>
          <button className="mb05" onClick={ ()=> navigate("/starprojects")}><Star/>star projects</button>
          <button className="mb05" onClick={ ()=> navigate("/community")}><Community/> community</button>
        </div>
        <div onClick={()=> setShowMenu(!showMenu)} className="central mb05">
          <button onClick={ ()=> navigate("/login")}><IoIosLogOut /> logout</button>
        </div>
        <div className="central" onClick={()=> setShowMenu(!showMenu)}>
          <button className="circle40 bg-FAV central BrgClsBtn" title="close">
            <h1><X /></h1>
          </button>
        </div>
      </div>
    </div>
  );
};

const BurgerMenuRecruiter = ({setShowMenu, showMenu}) => {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)
  return (
    <div className="burger-container">
      <div>
        <div >
          <p className="c-A80">recruiter menu</p>
        </div>
        <div onClick={()=> setShowMenu(!showMenu)} className="mb2">
          lightmode/darkmode
        </div>
        <div onClick={() => setShowMenu(!showMenu)} className="mb15 col central">
          <button className="mb05" onClick={ ()=> navigate(`/userDetails/${user._id}`)}><MdOutlinePerson/> my profile</button>
          <button className="mb05" onClick={ ()=> navigate("/community")}>find talents</button>
          <button className="mb05" onClick={() => navigate("/starprojects")}>find projects</button>
          <button className="mb05" onClick={ ()=> navigate("/newsearch")}>new search</button>
          {/* <button className="mb05" onClick={ ()=> navigate("/searchhistory")}>search history</button> */}
        </div>
        <div onClick={()=> setShowMenu(!showMenu)} className="central mb05" >
          <button className="mb05" onClick={ ()=> navigate("/login")}><IoIosLogOut /> logout</button>
        </div>

        <div className="central" onClick={()=> setShowMenu(!showMenu)}>
          <button className="circle40 bg-FAV central BrgClsBtn" title="close">
            <h1><X /></h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export {BurgerMenuTalent, BurgerMenuRecruiter};