import { useContext } from "react";
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

// CONTEXT
import UserContext from "../../context/userContext.jsx";


const Start = () => {
  const [user, setUser] = useContext(UserContext)
  return (
    <>
      < Newsfeed />
      < CategoriesFilter />
    {user?.profile?.isTalent && < TalentMenu />}
    {user?.profile?.isRecruiter && <RecruiterMenu />}
      < Footer />
    </>
  );
};

export default Start;