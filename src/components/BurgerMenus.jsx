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
import { MdOutlineClose as X } from "react-icons/md"
import { MdLightbulbOutline as Light } from "react-icons/md"

// CONTEXT
import UserContext from "../context/userContext";


const BurgerMenuTalent = ({setShowMenu, showMenu}) => {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)

  return (
    <div className="burger-container">
      <div>
        <div onClick={() => { setShowMenu(!showMenu) }} className="mb15 col">
          <div className="col">
            <p className="mb05 info center">projects</p>
            <button className="mb05 rel" onClick={() => navigate("/createproject")}>
              <NewProject className="burger-icon"/>
              <p className="ml2">new project</p>
            </button>
            <button className="mb05 rel" onClick={() => navigate("/myprojects")}>
              <Projects className="burger-icon"/> 
              <p className="ml2">my projects</p>
            </button>
            <button className="mb05 rel" onClick={() => navigate("/projects")}>
              <Star className="burger-icon"/>
              <p className="ml2">projects</p>
              </button>
            </div>
            <div className="mt05 col">
              <p className="mb05 info center">profiles</p>
              <button className="mb05 rel" onClick={() => navigate(`/userdetails/${user._id}`)}>
                < MdOutlinePerson className="burger-icon"/>
                <p className="ml2">my profile</p>
              </button>
              <button className="mb05 rel" onClick={() => navigate("/community")}>
                <Community className="burger-icon"/> 
                <p className="ml2">community</p>
              </button>
            </div>
            <div className="mt05 col">
            <p className="mb05 info center">system</p>
              <button className="mb05 rel">
                <Light className="burger-icon"/> 
                <p className="ml2">light/dark</p>
              </button>
              <div onClick={()=> setShowMenu(!showMenu)} className="mb05">
              <button className="mb05 rel" onClick={() => navigate("/login")}>
                <IoIosLogOut className="burger-icon"/>
                <p className="ml2">logout</p>
              </button>
            </div>
          </div>

          <div>
            <p className="info center">close menu</p>
            <div className="central" onClick={()=> { setShowMenu(!showMenu) }}>
              <button className="circle40 bg-FAV BrgClsBtn central" title="close">
                  <X/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BurgerMenuRecruiter = ({setShowMenu, showMenu, setShowNotifications}) => {
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)
  return (
    <div className="burger-container">
      <div>
        <div >
          <p className="c-A80">recruiter menu</p>
        </div>
        <div onClick={()=> {
          setShowMenu(!showMenu)

          }} className="mb2">
          lightmode/darkmode
        </div>
        <div onClick={() => setShowMenu(!showMenu)} className="mb15 col central">
          <button className="mb05" onClick={ ()=> navigate(`/userDetails/${user._id}`)}><MdOutlinePerson/> my profile</button>
          <button className="mb05" onClick={ ()=> navigate("/community")}>talents</button>
          <button className="mb05" onClick={() => navigate("/projects")}>projects</button>
          <button className="mb05" onClick={ ()=> navigate("/newsearch")}>search talents</button>
          {/* <button className="mb05" onClick={ ()=> navigate("/searchhistory")}>search history</button> */}
        </div>
        <div onClick={()=> setShowMenu(!showMenu)} className="central mb05" >
          <button className="mb05" onClick={ ()=> {
            navigate("/login")

            }}><IoIosLogOut /> logout</button>
        </div>

        <div className="central" onClick={()=> {
          setShowMenu(!showMenu)

          }}>
          <button className="circle40 bg-FAV central BrgClsBtn" title="close">
            <h1><X /></h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export {BurgerMenuTalent, BurgerMenuRecruiter};