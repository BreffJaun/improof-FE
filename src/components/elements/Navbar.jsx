import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { host } from "../../api/host.jsx";

import { BurgerMenuRecruiter, BurgerMenuTalent } from "../BurgerMenus.jsx";
import MasterSearch from "./MasterSearch.jsx";

// STYLE
import "../../styles/navbar.scss";

// ICONS
import { BiMessageAlt as Message } from "react-icons/bi";
import { AiOutlineBell as Bell } from "react-icons/ai";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxMagnifyingGlass as Lupe } from "react-icons/rx";;
import { RiHome2Line as Home } from "react-icons/ri";
import logo from "../../images/improof_A100.png";
import logos from "./LogoChecker.jsx";


// CONTEXT
import UserContext from "../../context/userContext.jsx";
import Notifications from "../pages/Notifications.jsx";
import Conversations from "../pages/Conversations.jsx";

const Navbar = ({ setModeTrigger, modeTrigger }) => {
  const [user, setUser] = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState({});
  // const [showResult, setShowResult] = useState(false)
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(undefined);
  const [showConversations, setShowConversations] = useState(undefined);
  const darkMode = user?.meta?.darkMode;
  const color = user?.meta?.colorTheme[0];
  const bg = user?.meta?.colorTheme[1];
  const width = window.innerWidth
  const navigate = useNavigate();

  const unreadNots = user?.notifications?.filter((not) => !not.isRead);
  const unreadMsgsSTEPONE = user?.conversations?.map((con) =>
    con.message.filter((msg) => !msg.isRead && msg?.from != user._id)
  );
  const unreadMsgs = unreadMsgsSTEPONE
    ?.map((arr) => arr.length)
    .reduce((a, b) => a + b, 0);

  useEffect(() => {
    const getSearch = async () => {
      await fetch(`${host}/search`, {
        method: "POST",
        body: JSON.stringify({ searchInput: search }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setSearchResult({
              talent: json.talentSearch,
              project: json.projectSearch,
            });
          }
        });
    };
    search && getSearch();
  }, [search]);

  useEffect(() => {
    const handleReadNotification = async () => {
      await fetch(`${host}/notifications/read`, {
        method: "PATCH",
        body: JSON.stringify({ userId: user._id }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    };

    const getUser = async () => {
      !showNotifications &&
        (await fetch(`${host}/users/checklogin`, {
          credentials: "include",
        })
          .then((response) => response.json())
          .then((json) => {
            if (json.status) {
              setUser(json.user);
            } else {
              navigate("/login");
            }
          }));
    };
    !showNotifications && !showConversations && getUser();
    showNotifications !== undefined && handleReadNotification();
  }, [showNotifications, showConversations]);

  const tagToFind = user?.meta?.colorTheme[0];
  const imageWithTag = logos.find(obj => obj.tag === tagToFind);
  const imageSrc = imageWithTag.src;

  return (

    <div className={`navbar-container`} id={darkMode ? `` : ``}>
    {/* <div className={`navbar-container`} id={darkMode ? `bgG` : ``}> */}
      <div onClick={() => navigate("/")} className="navbar-left">
        <div className={`logo-container`}>
          <img src={imageSrc}  alt="improof-logo" />
        </div>
        {width >= 580 && <h1 className={`logo-HL ${user?.meta?.colorTheme[0]}`}>improof</h1>}
      </div>

      <div>
        <div className="navbar-right">
          { width >= 500 || width < 500 && !showSearch ? 
          <>
            <div className="bell rel">
              <Bell
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMenu(false);
                  setShowSearch(false);
                  setShowConversations(undefined);
                }}
              />
              {unreadNots?.length > 0 && (
                <div className={`signal circle15 ${bg} central`}>
                  <div className="c-A100">{unreadNots.length}</div>
                </div>
              )}
            </div>
            <div className="rel">
              <Message
                onClick={() => {
                  setShowConversations(!showConversations);
                  setShowNotifications(undefined);
                  setShowSearch(false);
                  setShowMenu(false);
                }}
              />
              {unreadMsgs > 0 && (
                <div className={`signal circle15 ${bg} central`}>
                  <div className="c-A100">{unreadMsgs}</div>
                </div>
              )}
            </div>
          </> : null
          }
          <div>
            {showSearch && (
              <input
                type="text"
                onChange={(event) => setSearch(event.target.value)}
              />
            )}
            <Lupe
              onClick={() => {
                setShowSearch(!showSearch);
                setShowNotifications(undefined);
                setShowConversations(undefined);
                setShowMenu(false);
                setSearchResult({});
              }}
            />
          </div>
         { width >= 500 && <div onClick={() => navigate("/")} className="rel">
            <Home />
          </div>}
          <div
            onClick={() => {
              setShowMenu(!showMenu);
              setShowNotifications(undefined);
              setShowConversations(undefined);
              setShowSearch(false);
            }}
          >
            <RxHamburgerMenu />
          </div>
        </div>

        <div>
          {showMenu && user?.profile?.isTalent && (
            <BurgerMenuTalent
              setShowMenu={setShowMenu}
              showMenu={showMenu}
              setModeTrigger={setModeTrigger}
              modeTrigger={modeTrigger}
            />
          )}
          {showMenu && user?.profile?.isRecruiter && (
            <BurgerMenuRecruiter
              setShowMenu={setShowMenu}
              showMenu={showMenu}
              setShowNotifications={setShowNotifications}
              setModeTrigger={setModeTrigger}
              modeTrigger={modeTrigger}
            />
          )}
        </div>
        <div>
          {showNotifications && (
            <Notifications
              showNotifications={showNotifications}
              setShowNotifications={setShowNotifications}
            />
          )}
        </div>
        <div>
          {showConversations && (
            <Conversations
              onClick={() => setShowConversations(false)}
              showConversations={showConversations}
              setShowConversations={setShowConversations}
              user={user}
            />
          )}
        </div>
        <div>
          {Object.keys(searchResult).length > 0 && showSearch && (
            <MasterSearch
              projects={searchResult.project}
              talents={searchResult.talent}
              setShowSearch={setShowSearch}
              darkMode={darkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
