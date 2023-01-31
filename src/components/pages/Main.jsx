

import { NavLink, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router"


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




// NAVBAR-COMPONENTEN
import Navbar from "../Navbar.jsx";
import Notifications from "./Notifications.jsx";
import Messages from "./Messages"


// COMPONENTS
import Start from "./Start.jsx";
import {LogoL, LogoS} from "../Logo.jsx"
import CreateProject from "./CreateProject.jsx";
import MyProjects from "./MyProjects.jsx";
import StarProjects from "./StarProjects.jsx";
import Community from "./Community.jsx";
import SearchHistory from "./SearchHistory.jsx";
import NewSearch from "./NewSearch.jsx";


// FOOTER-COMPONENTEN
import Footer from "../Footer.jsx";
import EFJM from "./EFJM.jsx";






const Main = () =>{
    return(
        <>
            < Navbar/>
            < LogoS />


            < Routes>
                <Route path="/" element={<Start/>} />

                <Route path="/createproject" element={<CreateProject/>} />
                <Route path="/myprojects" element={<MyProjects/>} />

                <Route path="/starprojects" element={<StarProjects/>} />
                <Route path="/community" element={<Community/>} />

                <Route path="/newsearch" element={<NewSearch/>}/>
                <Route path="/searchhistory" element={<SearchHistory/>} />

                <Route path="/notifications" element={<Notifications/>} />
                <Route path="/messages" element={<Messages/>} />

                <Route path="/efjm" element={<EFJM/>} />

            </Routes>

            < Footer/>
        </>
    )

}

export default Main;