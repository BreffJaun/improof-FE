import { Route, Routes } from "react-router"

// NAVBAR-COMPONENTEN
import Navbar from "../Navbar.jsx";
import Notifications from "./Notifications.jsx";
import Messages from "./Messages"
import MyProfil from "./MyProfil.jsx";

// COMPONENTS
import Start from "./Start.jsx";
import {LogoL, LogoS} from "../Logo.jsx"
import CreateProject from "./CreateProject.jsx";
import MyProjects from "./MyProjects.jsx";
import StarProjects from "./StarProjects.jsx";
import Community from "./Community.jsx";
import SearchHistory from "./SearchHistory.jsx";
import NewSearch from "./NewSearch.jsx";
import ProjectDetails from "./ProjectDetails.jsx";
// FOOTER-COMPONENTEN
import Footer from "../Footer.jsx";
import EFJM from "./EFJM.jsx";

const Main = () =>{
    return(
        <>
            < Navbar/>
            < LogoS />

            < Routes>
                {/* ROUTES BOTH */}
                <Route path="/" element={<Start/>} />
                <Route path="/myprofil" element={<MyProfil/>} />
                <Route path="/starprojects" element={<StarProjects/>} />
                <Route path="/community" element={<Community/>} />
                <Route path="/efjm" element={<EFJM/>} />
                <Route path="/projectdetails" element={<ProjectDetails/>} />

                {/* ROUTES TALENT */}
                <Route path="/createproject" element={<CreateProject/>} />
                <Route path="/myprojects" element={<MyProjects/>} />

                {/* ROUTES RECRUITER */}
                <Route path="/newsearch" element={<NewSearch/>}/>
                <Route path="/searchhistory" element={<SearchHistory/>} />

                {/* ROUTES NAVBAR */}
                <Route path="/notifications" element={<Notifications/>} />
                <Route path="/messages" element={<Messages/>} />
            </Routes>

            < Footer/>
        </>
    )
}

export default Main;