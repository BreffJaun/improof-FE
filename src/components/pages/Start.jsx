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
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const mode = user.meta.darkMode;

  return (
    <>
      <div className={mode ? `bgG mt4 mb2` : `mt4 mb2`}>
        <h1 className={`central ${color}`}>What´s new?</h1>
      </div>
      <Newsfeed />
      <div className="bo-DARK"></div>
      {user?.profile?.isTalent && <TalentMenu />}
      {user?.profile?.isRecruiter && <RecruiterMenu />}
      <Footer />
    </>
  );
};

export default Start;
