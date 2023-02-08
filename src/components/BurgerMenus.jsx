import { useNavigate } from "react-router-dom";
import { useContext } from "react";

// STYLE
import "../styles/burgermenu.scss";

// ICONS
import { IoIosLogOut } from "react-icons/io";

// CONTEXT
import UserContext from "../context/userContext";
import DarkModeContext from "../context/darkModeContext.jsx";

const BurgerMenuTalent = ({ setShowMenu, showMenu }) => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={darkMode ? `burger-container-dark` : `burger-container-light`}
    >
      <div>
        <p>TALENT BURGER MENU</p>
        <div onClick={() => setShowMenu(!showMenu)}>
          <button onClick={toggleDarkMode}>switch mode</button>
          <p
            onClick={() => {
              navigate(`/userdetails/${user._id}`);
            }}
          >
            my profile
          </p>
        </div>
        <div onClick={() => setShowMenu(!showMenu)}>
          <p onClick={() => navigate("/createproject")}>new project</p>
          <p onClick={() => navigate("/myprojects")}>my projects</p>
          <p onClick={() => navigate("/starprojects")}>star projects</p>
          <p onClick={() => navigate("/community")}>community</p>
        </div>
        <div onClick={() => setShowMenu(!showMenu)}>
          <p onClick={() => navigate("/login")}>
            <IoIosLogOut />
          </p>
        </div>
      </div>
    </div>
  );
};

const BurgerMenuRecruiter = ({ setShowMenu, showMenu }) => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const navigate = useNavigate();
  return (
    <div
      className={darkMode ? `burger-container-dark` : `burger-container-light`}
    >
      <div className="burger-recruiter">
        <p>RECRUITER BURGER MENU</p>
        <div onClick={() => setShowMenu(!showMenu)}>
          <button onClick={toggleDarkMode}>switch mode</button>
          <p onClick={() => navigate("/myprofil")}>my profile</p>
        </div>
        <div onClick={() => setShowMenu(!showMenu)}>
          <p onClick={() => navigate("/newsearch")}>newsearch</p>
          <p onClick={() => navigate("/community")}>star talents</p>
          <p onClick={() => navigate("/starprojects")}>star projects</p>
          <p onClick={() => navigate("/searchhistory")}>search history</p>
        </div>
        <div onClick={() => setShowMenu(!showMenu)}>
          <p onClick={() => navigate("/login")}>
            <IoIosLogOut />
          </p>
        </div>
      </div>
    </div>
  );
};

export { BurgerMenuTalent, BurgerMenuRecruiter };
