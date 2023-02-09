import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { host } from "../api/host.jsx";

import { BurgerMenuRecruiter, BurgerMenuTalent } from "./BurgerMenus.jsx";

// STYLE
import '../styles/navbar.scss'

// ICONS
import { BiMessageAlt } from 'react-icons/bi'
import { GrNotification } from "react-icons/gr"
import { GrSearch } from "react-icons/gr"
import { MdOutlinePerson } from "react-icons/md"

// CONTEXT
import UserContext from "../context/userContext.jsx";



const Navbar = () => {
  const [user, setUser] = useContext(UserContext)
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setshowSearch] = useState()

  const navigate = useNavigate()
  console.log(user);
  const unreadNots = user?.notifications?.filter(not => !not.isRead)
  const unreadMsgs = user?.conversations?.message?.filter(msg => !msg.isRead)

  const handleReadNotification = async () => {
    await fetch(`${host}/notifications/read`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId: user._id,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  return (
    <>
      <div className="navbar mt2">
        <div onClick={() => {
          navigate("/notifications")
          handleReadNotification()
          }} className="rel" >
          < GrNotification />
          {unreadNots?.length > 0  && 
            <div className="signal circle15 bg-FAV central abs" >
              <div className="c-A100">{unreadNots.length}</div>
            </div>
          }
        </div>
        <div onClick={() => navigate("/messages")} className="rel">
          < BiMessageAlt />
          {unreadMsgs?.length && 
            <div className="signal circle15 bg-FAV central abs">
              <div className="c-A100">{unreadMsgs?.length}</div>
            </div>
          }
        </div>
        {showSearch ? 
        <div><input type="text" /><GrSearch onClick={ ()=> setshowSearch(!showSearch)}/></div> : <div onClick={ ()=> setshowSearch(!showSearch)}>< GrSearch /></div>}
        <div onClick={ ()=> setShowMenu(!showMenu)} >< MdOutlinePerson /></div>
      </div>

      <div>
        { showMenu && user?.profile?.isTalent && <BurgerMenuTalent setShowMenu={setShowMenu} showMenu={showMenu}/>}
        { showMenu && user?.profile?.isRecruiter && <BurgerMenuRecruiter setShowMenu={setShowMenu} showMenu={showMenu}/>}
      </div>
    </>
  );
};



export default Navbar;