import { useNavigate } from "react-router-dom";

//STYLE
import '../styles/burgermenu.scss'


//
import {IoIosLogOut} from "react-icons/io"


const BurgerMenuTalent = () => {
  const navigate = useNavigate()

  return (
    <div className="burger-container">
      <div>
        <p>TALENT BURGER MENU</p>
        <div>
          lightmode/darkmode
          <p onClick={ ()=> navigate("/myprofil")}>my profile</p>
        </div>
        <div>
          <p onClick={ ()=> navigate("/createproject")}>new project</p>
          <p onClick={ ()=> navigate("/myprojects")}>my projects</p>
          <p onClick={ ()=> navigate("/starprojects")}>star projects</p>
          <p onClick={ ()=> navigate("/community")}>community</p>
        </div>
        <div>
          <p onClick={ ()=> navigate("/login")}><IoIosLogOut /></p>
        </div>
      </div>
    </div>
  );
};




const BurgerMenuRecruiter = () => {
  return (
    <div className ="burger-container">
      <div className="burger-recruiter">
        <p>RECRUITER BURGER MENU</p>
        <div>
          lightmode/darkmode
          <p onClick={ ()=> navigate("/myprofil")}>my profile</p>
        </div>
        <div>
          <p onClick={ ()=> navigate("/newsearch")}>newsearch</p>
          <p onClick={ ()=> navigate("/community")}>star talents</p>
          <p onClick={ ()=> navigate("/starprojects")}>star projects</p>
          <p onClick={ ()=> navigate("/searchhistory")}>search history</p>
        </div>
        <div>
          <p onClick={ ()=> navigate("/login")}><IoIosLogOut /></p>
        </div>
      </div>
    </div>
  );
};

export {BurgerMenuTalent, BurgerMenuRecruiter};