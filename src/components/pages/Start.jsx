import { NavLink, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router"



import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// COMPONENTS
import Newsfeed from "../Newsfeed.jsx";
import TalentMenu from "../TalentMenu.jsx";
import RecruiterMenu from "../RecruiterMenu.jsx";



const Start = () => {
  return (
    <>
      < Newsfeed />
      < TalentMenu />
      <RecruiterMenu />
      
      {/* {user.isTalent ?
      < TalentMenu />
      : 
      < RecruiterMenu />
      } */}
    </>
  );
};

export default Start;