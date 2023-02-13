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
  const [currUser, setCurrUser] = useState({})
  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setshowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(undefined)
  const [showConversations, setShowConversations] = useState(undefined)

  const navigate = useNavigate()

  const unreadNots = user?.notifications?.filter(not => !not.isRead)
  const unreadMsgsSTEPONE = user?.conversations?.map(con => con.message.filter(msg => !msg.isRead && msg?.from != user._id))
  const unreadMsgs = unreadMsgsSTEPONE.map(arr => arr.length).reduce((a, b) => a + b, 0)

  useEffect(()=> {
    const handleReadNotification = async () => {
      await fetch(`${host}/notifications/read`, {
        method: 'PATCH',
        body: JSON.stringify({userId: user._id}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
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
    !showNotifications&& !showConversations && getUser();
    showNotifications !== undefined && handleReadNotification()

  },[showNotifications, showConversations])

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
                  setShowConversations(undefined)
                  }} />
              {unreadNots?.length > 0  && 
              <div className="signal circle15 bg-FAV central" >
                <div className="c-A100">{unreadNots.length}</div>
              </div>
            }
          </div>
          <div >
            <Message onClick={() => {
              setShowConversations(!showConversations)
              setShowNotifications(undefined)
              setShowMenu(false)
              }}/> 
              {unreadMsgs > 0 && 
                <div className="signal circle15 bg-FAV central">
                  <div className="c-A100">{unreadMsgs}</div>
                </div>
              }
          </div>
          <div>
            {showSearch && <input type="text" /> }
            <Lupe onClick={() =>{ 
              setshowSearch(!showSearch)
              setShowNotifications(undefined)
              setShowConversations(undefined)
              setShowMenu(false)
              }}/> 
          </div>
          <div onClick={() => navigate("/")} className="rel"><Home /></div>
          <div onClick={ ()=> {
            setShowMenu(!showMenu)
            setShowNotifications(undefined)
            setShowConversations(undefined)
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
          { showConversations && <Conversations onClick={()=>setShowConversations(false)} showConversations={showConversations} setShowConversations={setShowConversations} user={user} unreadMsgs={unreadMsgsSTEPONE}/> }
        </div>
      </div>
    </div>
  );
};



export default Navbar;