import { useNavigate } from "react-router-dom";
import { BurgerMenuRecruiter, BurgerMenuTalent } from "./BurgerMenus.jsx";

import { useContext, useState } from "react";

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

  const [showMenu, setShowMenu] = useState(false)
  const [showSearch, setshowSearch] = useState()
  const [user, setUser] = useContext(UserContext)

  const navigate = useNavigate()


  return (
    <>
      <div className="navbar">
        <div onClick={ ()=> navigate("/messages")} >< BiMessageAlt /></div>
        <div onClick={ ()=> navigate("/notifications")} >< GrNotification /></div>
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