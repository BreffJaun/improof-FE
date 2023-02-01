import { NavLink, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// COMPONENTS
import Newsfeed from "../elements/Newsfeed.jsx";
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import TalentMenu from "../TalentMenu.jsx";
import RecruiterMenu from "../RecruiterMenu.jsx";
import Footer from "../elements/Footer.jsx";


const Start = () => {
  return (
    <>
      < Newsfeed />
      < CategoriesFilter />

      < TalentMenu />
      <RecruiterMenu />
      
      {/* {user.isTalent ?
      < TalentMenu />
      : 
      < RecruiterMenu />
      } */}
      < Footer />
    </>
  );
};

export default Start;