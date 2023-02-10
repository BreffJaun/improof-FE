import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { host } from "../api/host.jsx";

import { BurgerMenuRecruiter, BurgerMenuTalent } from "./BurgerMenus.jsx";

// STYLE
import '../styles/navbar.scss'

// ICONS
import { BiMessageAlt as Message} from 'react-icons/bi'
import { AiOutlineBell as Bell } from "react-icons/ai"
import { RxHamburgerMenu } from "react-icons/rx"
import { RxMagnifyingGlass as Lupe } from "react-icons/rx"
import { RiHome2Line as Home} from "react-icons/ri"


// CONTEXT
import UserContext from "../context/userContext.jsx";
import Notifications from "./pages/Notifications.jsx";
import Conversations from "./pages/Conversations.jsx";




const Navbar = () => {
  const [user, setUser] = useContext(UserContext)
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setshowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showConversations, setShowConversations] = useState(false)

  const navigate = useNavigate()

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
  // const handleMenu = (event)=>{
  //   console.log(event.target.closest("div").className)
  //   event.target.closest("div").name === "bell" && 
  //   setShowNotifications(!showNotifications) && 
  //   setShowMenu(false)

  // }

  return (
    <>
      <div className="navbar mt2">
        <div onClick={() => handleReadNotification()} className="rel bell">
              <Bell onClick={()=> setShowNotifications(!showNotifications)} />
            {unreadNots?.length > 0  && 
            <div className="signal circle15 bg-FAV central abs" >
              <div className="c-A100">{unreadNots.length}</div>
            </div>
          }
        </div>

        <div className="rel">
          <Message onClick={() => setShowConversations(!showConversations)}/> 
            {unreadMsgs?.length && 
              <div className="signal circle15 bg-FAV central abs">
                <div className="c-A100">{unreadMsgs?.length}</div>
              </div>
            }
        </div>
        
        <div>
          {showSearch && <input type="text" /> }
          <Lupe onClick={() => setshowSearch(!showSearch)}/> 
        </div> 

        <div onClick={() => navigate("/")} className="rel"><Home /></div>
        <div onClick={ ()=> setShowMenu(!showMenu)} ><RxHamburgerMenu /></div>
      </div>

      <div>
        { showMenu && user?.profile?.isTalent && 
        <BurgerMenuTalent setShowMenu={setShowMenu} showMenu={showMenu}/>}
        { showMenu && user?.profile?.isRecruiter && <BurgerMenuRecruiter setShowMenu={setShowMenu} showMenu={showMenu}/>}
      </div>

      <div>
        { showNotifications && <Notifications showNotifications={showNotifications} setShowNotifications={setShowNotifications} /> }        
      </div>

      <div>
        { showConversations && <Conversations showConversations={showConversations} setShowConversations={setShowConversations} /> }        
      </div>
    </>
  );
};



export default Navbar;