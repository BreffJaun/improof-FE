import { useNavigate } from "react-router-dom";
import { BurgerMenuRecruiter, BurgerMenuTalent } from "./BurgerMenus.jsx";

import { useState } from "react";

// STYLE
import '../styles/navbar.scss'

// ICONS
import { BiMessageAlt } from 'react-icons/bi'
import { GrNotification } from "react-icons/gr"
import { GrSearch } from "react-icons/gr"
import { MdOutlinePerson } from "react-icons/md"




const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()


  return (
    <>
      <div className="navbar">
        <p onClick={ ()=> navigate("/messages")} >< BiMessageAlt /></p>
        <p onClick={ ()=> navigate("/notifications")} >< GrNotification /></p>
        <p>< GrSearch /></p>
        <p onClick={ ()=> setShowMenu(!showMenu)} >< MdOutlinePerson /></p>
      </div>

      <div>
        { showMenu&& < BurgerMenuTalent />}
        { showMenu&& < BurgerMenuRecruiter />}
      </div>
    </>
  );
};



export default Navbar;