import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router";
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
  const [user, setUser] = useContext(UserContext);
  return (
    <>
      <div className="mt4 mb4">
        <h1 className="central c-FAV">Newsfeed</h1>
        <h4 className="central c-FAV mt05">What´s new on improof?</h4>
      </div>
      <Newsfeed />
      {/* <div className="central col">
        <h1 className="c-FAV mb1">filter your interest</h1>
        < CategoriesFilter />
      </div> */}

      <div className="bo-DARK"></div>
      {user?.profile?.isTalent && <TalentMenu />}
      {user?.profile?.isRecruiter && <RecruiterMenu />}
      <Footer />
    </>
  );
};

export default Start;
