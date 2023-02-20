import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/userContext.jsx";


// STYLE
import "../../styles/efjm.scss"


// COMPONENTS
import Eleni from "../elements/EFJM-eleni.jsx";
import Martin from "../elements/EFJM-martin.jsx"
import Florian from "../elements/EFJM-florian.jsx";
import Jeff from "../elements/EFJM-jeff.jsx"


// ICONS
import { GrClose as X} from "react-icons/gr"


const EFJM = () => {
    const navigate = useNavigate()
    const [user, setUser] = useContext(UserContext);
    const color = user.meta.colorTheme[0]
    const bg = user.meta.colorTheme[1]
    
    return (
        <div className="max1300">
            <div className="maxM mb2">
                <div>
                    <h1 className={`central ${color}`}>Hello, nice to meet you!</h1>
                    <h4 className={`central ${color}`}>We are EFJM</h4>
                </div>
                <div className="efjm-container">
                    <div className="efjm-card"><Eleni /></div>
                    <div className="efjm-card"><Florian /></div>
                    <div className="efjm-card"><Jeff /></div>
                    <div className="efjm-card"><Martin /></div>
                </div>
            </div>
            <div className="logoContainer">
                <div className={`efjm rel ${bg} center`} onClick= { ()=> navigate("/")}>
                    <div className="whity central center">
                        <p><X/></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EFJM;