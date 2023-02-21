import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { host } from "../api/host.jsx";

// STYLE
import "../styles/burgermenu.scss";

// ICONS
import { IoIosLogOut } from "react-icons/io";
import { MdOutlinePerson } from "react-icons/md";
import { MdPeopleOutline as Community } from "react-icons/md";
import { AiOutlineAppstoreAdd as Projects } from "react-icons/ai";
import { AiOutlinePlusSquare as NewProject } from "react-icons/ai";
import { AiOutlineStar as Star } from "react-icons/ai";
import { MdOutlineClose as X } from "react-icons/md";

import { BsLightbulbOff as Dark } from "react-icons/bs";
import { BsLightbulb as Light } from "react-icons/bs";


// CONTEXT
import UserContext from "../context/userContext";
import TriggerContext from "../context/triggerContext.jsx";


const BurgerMenuTalent = ({
  setShowMenu,
  showMenu,
  setModeTrigger,
  modeTrigger,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  // const [trigger,setTrigger] = useContext(TriggerContext)
  const bg = user.meta.colorTheme[1];
  const mode = user.meta.darkMode;

  const handleMode = async () => {
    await fetch(`${host}/users/darkMode`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({
        darkMode: !mode,
        userId: user._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setModeTrigger(!modeTrigger);
        // const body = document.querySelector("body");
        // mode && body.classList.add(`bgG`);
      });
  };

  return (
    <div className="burger-container">
      <div
        onClick={() => {
          setShowMenu(!showMenu);
        }}
        className="mb15 col"
        id={mode && "bgG"}
      >
        <div>
          <div className="col">
            <p className="mb05 info center">projects</p>
            <button
              className={`mb05 rel ${bg}`}
              onClick={() => navigate("/createproject")}
            >
              <NewProject className="burger-icon" />
              <p className="ml2">new project</p>
            </button>
            <button
              className={`mb05 rel ${bg}`}
              onClick={() => navigate("/myprojects")}
            >
              <Projects className="burger-icon" />
              <p className="ml2">my projects</p>
            </button>
            <button
              className={`mb05 rel ${bg}`}
              onClick={() => navigate("/projects")}
            >
              <Star className="burger-icon" />
              <p className="ml2">projects</p>
            </button>
          </div>
          <div className="mt05 col">
            <p className="mb05 info center">profiles</p>
            <button
              className={`mb05 rel ${bg}`}
              onClick={() => navigate(`/userdetails/${user._id}`)}
            >
              <MdOutlinePerson className="burger-icon" />
              <p className="ml2">my profile</p>
            </button>
            <button
              className={`mb05 rel ${bg}`}
              onClick={() => navigate("/community")}
            >
              <Community className="burger-icon" />
              <p className="ml2">community</p>
            </button>
          </div>
          <div className="mt05 col">
            <p className="mb05 info center">system</p>
            <button className={`mb05 rel ${bg}`} onClick={handleMode}>
              {/* <Light className="burger-icon" />
              <p className="ml2">light/dark</p> */}

              {mode ?
                <div>
                  < Light className="burger-icon" />
                  <p className="ml2">lightmode</p>
                </div>
                :
                <div>
                  < Dark className="burger-icon" />
                  <p className="ml2">darkmode</p>
                </div>}

            </button>
            <div onClick={() => setShowMenu(!showMenu)} className="mb05">
              <button
                className={`mb05 rel ${bg}`}
                onClick={() => navigate("/login")}
              >
                <IoIosLogOut className={`burger-icon`} />
                <p className="ml2">logout</p>
              </button>
            </div>
          </div>

          <p className="info center">close menu</p>
          <div
            className="central"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <button className={`circle40 BrgClsBtn ${bg} central`} title="close">
              <X />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BurgerMenuRecruiter = ({
  setShowMenu,
  showMenu,
  setShowNotifications,
  setModeTrigger,
  modeTrigger,
}) => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const bg = user.meta.colorTheme[1];
  const mode = user.meta.darkMode;

  const handleMode = async () => {
    await fetch(`${host}/users/darkMode`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({
        darkMode: !mode,
        userId: user._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setModeTrigger(!modeTrigger));
  };

  return (
    <div className="burger-container">
      <div
        onClick={() => {
          setShowMenu(!showMenu);
        }}
        className="mb15 col"
        id={mode && "bgG"}
      >
        <div>
          <div className="mt05 col">
            <button
              className={`mb05 rel ${bg}`}
              onClick={() => navigate("/newsearch")}
            >
              new search
            </button>
            <button
              className={`mb05 rel ${bg}`}
              onClick={() => navigate("/community")}
            >
              talents
            </button>
            <button
              className={`mb05 rel ${bg}`}
              onClick={() => navigate("/projects")}
            >
              projects
            </button>
            {/* <button className="mb05" onClick={ ()=> navigate("/searchhistory")}>search history</button> */}
          </div>

          <div className="mt15 col">
            <button
              className={`mb05 rel ${bg}`}
              onClick={() => navigate(`/userdetails/${user._id}`)}
            >
              <MdOutlinePerson className="burger-icon" />
              <p className="ml2">my profile</p>
            </button>
          </div>
          <div>
            <button className={`mb05 rel ${bg}`} onClick={handleMode}>
              <Light className="burger-icon" />
              <p className="ml2">light/dark</p>
            </button>
          </div>
          <div onClick={() => setShowMenu(!showMenu)} className="mb05">
            <button
              className={`mb05 rel ${bg}`}
              onClick={() => navigate("/login")}
            >
              <IoIosLogOut className="burger-icon" />
              <p className="ml2">logout</p>
            </button>
          </div>
        </div>
        <div
          className="central"
          onClick={() => {
            setShowMenu(!showMenu);
          }}
        >
          <div
            className="central"
            onClick={() => {
              setShowMenu(!showMenu);
            }}
          >
            <button className="circle40 bg-FAV BrgClsBtn central" title="close">
              <X />{" "}
            </button>
            <div
              className="central"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <div
                className="central"
                onClick={() => {
                  setShowMenu(!showMenu);
                }}
              >
                <button className="circle40 BrgClsBtn central" title="close">
                  <X />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BurgerMenuTalent, BurgerMenuRecruiter };
