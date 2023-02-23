import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

// COMPONENTS
import TalentMenu from "../TalentMenu.jsx";
import RecruiterMenu from "../RecruiterMenu.jsx";


const Sidebar = ({ stone, project }) => {
    const navigate = useNavigate();
    const [user, setUser] = useContext(UserContext);
    const bg = user.meta.colorTheme[1];

    return (
        <div className="sidebar-container">
            <div className="sidebar">
            {user?.profile?.isTalent && <TalentMenu />}
            {user?.profile?.isRecruiter && <RecruiterMenu />}
            </div>
        </div>
    );
};

export default Sidebar;
