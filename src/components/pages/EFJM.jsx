import { useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";
import "../../styles/efjm.scss"


// ICONS
import {GrClose} from "react-icons/gr"


const EFJM = () => {
    const navigate = useNavigate()
    
    return (
        <>
            <div className="mb2 mt2">
                <h1 className="central c-FAV">Hello, we are "efjm"!</h1>
            </div>


            {/* ELENI */}
            <div className="card efjm-card central col rel">
                <div className="efjm-avatar-container bg-FAV central">
                    <h1>EO</h1>
                </div>
                <div className="col mt3 mb1">
                    <h3 className="c-FAV">Eleni Orfanou</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magni, quibusdam omnis alias illum quos!</p>
                </div>
                <div className="col mb1">
                    <p className="c-FAV">Mein Bereich:</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magni, quibusdam omnis alias illum quos!</p>
                </div>
                <div className="col mb1">
                    <p className="c-FAV">Meine Stärken</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magni, quibusdam omnis alias illum quos!</p>
                </div>
                <div className="contact mb15">
                    <div className="circle30 bg-FAV"></div>
                    <div className="circle30 bg-FAV"></div>
                    <div className="circle30 bg-FAV"></div>
                    <div className="circle30 bg-FAV"></div>
                </div>
            </div>


            {/* CLOSE-BUTTON */}
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