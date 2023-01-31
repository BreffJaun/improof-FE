import { useNavigate } from "react-router-dom";
import { BurgerMenuRecruiter, BurgerMenuTalent } from "./BurgerMenus.jsx";

import { useState } from "react";



const Navbar = () => {

  const [showMenu, setShowMenu] = useState(false)

  const navigate = useNavigate()

  return (
    <div>
      Navbar

      <div>
        <p onClick={ ()=> navigate("/")}>messages</p>
        <p onClick={ ()=> navigate("/")}>notifications</p>
        <p onClick={ ()=> navigate("/")}>search</p>
        <p onClick={ ()=> setShowMenu(!showMenu)}>my profile</p>
      </div>
      <div>
        <p onClick={ ()=> navigate("/login") }>logout</p>
      </div>
      <div>
        { showMenu&& < BurgerMenuTalent />}
      </div>
    </div>
  );
};



export default Navbar;