import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { host } from "../../api/host.jsx";

import { BurgerMenuRecruiter, BurgerMenuTalent } from "../BurgerMenus.jsx";

// STYLE
import '../../styles/navbar.scss'

// ICONS
import { BiMessageAlt as Message} from 'react-icons/bi'
import { AiOutlineBell as Bell } from "react-icons/ai"
import { RxHamburgerMenu } from "react-icons/rx"
import { RxMagnifyingGlass as Lupe } from "react-icons/rx"
import { RiHome2Line as Home } from "react-icons/ri"
import logo from "../../images/improof_OR.png"



// CONTEXT
import UserContext from "../../context/userContext.jsx";
import Notifications from "../pages/Notifications.jsx";
import Conversations from "../pages/Conversations.jsx";




const Navbar = () => {
  const [user, setUser] = useContext(UserContext)
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setshowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showConversations, setShowConversations] = useState(false)

  const navigate = useNavigate()

  const unreadNots = user?.notifications?.filter(not => !not.isRead)
  const unreadMsgs = user?.conversations?.message?.filter(msg => !msg.isRead)

  useEffect(()=> {
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
        .then((json) => null);
    }

    const getUser = async () => {
      !showNotifications && 
      await fetch(`${host}/users/checklogin`,{
        credentials:"include"
        })
        .then((response) => response.json())
        .then((json) => {
          if(json.status){
            setUser(json.user)
          }else{
            navigate("/login")
          }      
      })
    }
    getUser();

    handleReadNotification()
  },[showNotifications])

  return (
    <div className="navbar-container">
      <div onClick={() => navigate("/")} className="navbar-left">
        <div className="logoNav">
          <img src={logo} alt="improof-logo"/>
          <h1 className="c-FAV">improof</h1>
        </div>
      </div>
      
      <div>
        <div className="navbar-right">
          <div className="bell">
                <Bell onClick={()=> {
                  setShowNotifications(!showNotifications)
                  setShowMenu(false)
                  setShowConversations(false)
                  }} />
              {unreadNots?.length > 0  && 
              <div className="signal circle15 bg-FAV central" >
                <div className="c-A100">{unreadNots.length}</div>
              </div>
            }
          </div>
          <div>
            <Message onClick={() => {
              setShowConversations(!showConversations)
              setShowNotifications(false)
              setShowMenu(false)
              }}/> 
              {unreadMsgs?.length && 
                <div className="signal circle15 bg-FAV central">
                <div className="c-A100">{unreadMsgs?.length}</div>
                </div>
              }
          </div>
          <div>
            {showSearch && <input type="text" /> }
            <Lupe onClick={() =>{ 
              setshowSearch(!showSearch)
              setShowNotifications(false)
              setShowConversations(false)
              setShowMenu(false)
              }}/> 
          </div>
          <div onClick={() => navigate("/")} className="rel"><Home /></div>
          <div onClick={ ()=> {
            setShowMenu(!showMenu)
            setShowNotifications(false)
            setShowConversations(false)
            }} ><RxHamburgerMenu />
          </div>
        </div>

        <div>
          { showMenu && user?.profile?.isTalent && 
          <BurgerMenuTalent
            setShowMenu={setShowMenu} 
            showMenu={showMenu}
            
        />}
          { showMenu && user?.profile?.isRecruiter && 
          <BurgerMenuRecruiter  
            setShowMenu={setShowMenu} showMenu={showMenu} setShowNotifications={setShowNotifications} />}
        </div>
        <div>
          { showNotifications && 
          <Notifications showNotifications={showNotifications} setShowNotifications={setShowNotifications} /> }        
        </div>
        <div>
          { showConversations && <Conversations onClick={()=>setShowConversations(false)} showConversations={showConversations} setShowConversations={setShowConversations} /> }
        </div>
      </div>
    </div>
  );
};



export default Navbar;