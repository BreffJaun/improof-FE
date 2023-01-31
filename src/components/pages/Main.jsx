

import { NavLink, useNavigate } from "react-router-dom";
import { Route, Routes } from "react-router"


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// COMPONENTS
import Start from "./Start.jsx";
import Navbar from "../Navbar.jsx";
import {LogoL, LogoS} from "../Logo.jsx"
import Footer from "../Footer.jsx";
import CreateProject from "./CreateProject.jsx";
import MyProjects from "./MyProjects.jsx";
import StarProjects from "./StarProjects.jsx";
import Community from "./Community.jsx";


import SearchHistory from "./SearchHistory.jsx";
import NewSearch from "./NewSearch.jsx";


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

            </Routes>



            < Footer/>
        </>
    )

}

export default Main;