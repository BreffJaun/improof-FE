import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// STYLE
import '../styles/burgermenu.scss'

// ICONS
import { IoIosLogOut } from "react-icons/io"

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
        <div onClick={() => setShowMenu(!showMenu)} className="mb15 col central">
          <p className="mb05" onClick={() => { navigate(`/userdetails/${user._id}`)}}>my profile</p>
          <p className="mb05" onClick={ ()=> navigate("/createproject")}>new project</p>
          <p className="mb05" onClick={ ()=> navigate("/myprojects")}>my projects</p>
          <p className="mb05" onClick={ ()=> navigate("/starprojects")}>star projects</p>
          <p className="mb05" onClick={ ()=> navigate("/community")}>community</p>
        </div>
        <div onClick={()=> setShowMenu(!showMenu)} className="central mb05">
          <p onClick={ ()=> navigate("/login")}><IoIosLogOut /></p>
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
          <p className="mb05" onClick={ ()=> navigate(`/userDetails/${user._id}`)}>my profile</p>
          <p className="mb05" onClick={ ()=> navigate("/community")}>find talents</p>
          <p className="mb05" onClick={() => navigate("/starprojects")}>find projects</p>
          <p className="mb05" onClick={ ()=> navigate("/newsearch")}>new search</p>
          <p className="mb05" onClick={ ()=> navigate("/searchhistory")}>search history</p>
        </div>
        <div onClick={()=> setShowMenu(!showMenu)} className="central mb05" >
          <p className="mb05" onClick={ ()=> navigate("/login")}><IoIosLogOut /></p>
        </div>
      </div>
    </div>
  );
};

export {BurgerMenuTalent, BurgerMenuRecruiter};