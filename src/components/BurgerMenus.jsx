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
          <button className="mb05" onClick={() => { navigate(`/userdetails/${user._id}`)}}>my profile</button>
          <button className="mb05" onClick={ ()=> navigate("/createproject")}>new project</button>
          <button className="mb05" onClick={ ()=> navigate("/myprojects")}>my projects</button>
          <button className="mb05" onClick={ ()=> navigate("/starprojects")}>star projects</button>
          <button className="mb05" onClick={ ()=> navigate("/community")}>community</button>
        </div>
        <div onClick={()=> setShowMenu(!showMenu)} className="central mb05">
          <button onClick={ ()=> navigate("/login")}><IoIosLogOut /> logout</button>
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
          <button className="mb05" onClick={ ()=> navigate("/community")}>find talents</button>
          <button className="mb05" onClick={() => navigate("/starprojects")}>find projects</button>
          <button className="mb05" onClick={ ()=> navigate("/newsearch")}>new search</button>
          <button className="mb05" onClick={ ()=> navigate("/searchhistory")}>search history</button>
        </div>
        <div onClick={()=> setShowMenu(!showMenu)} className="central mb05" >
          <p className="mb05" onClick={ ()=> navigate("/login")}><IoIosLogOut /></p>
        </div>
      </div>
    </div>
  );
};

export {BurgerMenuTalent, BurgerMenuRecruiter};