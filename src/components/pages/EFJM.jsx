import { useNavigate } from "react-router-dom";

// ICONS
import {GrClose} from "react-icons/gr"

const EFJM = () => {
    const navigate = useNavigate()
    
    return (
        <div className="componente">
            <h1>componente EFJM</h1>
            <div onClick={() => navigate("/")}><GrClose /></div>
        </div>
    );
};

export default EFJM;