import { useNavigate } from "react-router-dom";
import "../../styles/efjm.scss"
import Eleni from "../elements/EFJM-eleni";


// ICONS
import {GrClose} from "react-icons/gr"


const EFJM = () => {
    const navigate = useNavigate()
    
    return (
        <>
            <div>
                <h1 className="central c-FAV">Hello, nice to meet you!</h1>
                <h4 className="central c-FAV mt05">We are EFJM</h4>
            </div>
            <div className="efjm-container">
                <div className="efjm-card">
                    <Eleni />
                </div>
                <div className="efjm-card">
                    <Eleni />
                </div>
                <div className="efjm-card">
                    <Eleni />
                </div>
                <div className="efjm-card">
                    <Eleni />
                </div>
            </div>
            <div className="logoContainer central">
                <div className="efjm bg-FAV central" onClick= { ()=> navigate("/")}>
                    <div className="whity">
                        <p>X</p>
                    </div>
                </div>
            </div>

        </>
    );
};

export default EFJM;