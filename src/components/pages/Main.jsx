import { useNavigate, Route, Routes } from "react-router"
import { useEffect, useState, useContext } from "react";

import { host } from "../../api/host.jsx";

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
import ProjectDetails from "./ProjectDetails.jsx";
import UserDetails from "./UserDetails.jsx";
import UserEdit from "./UserEdit.jsx";


// FOOTER-COMPONENTEN
import EFJM from "./EFJM";


//CONTEXT
import UserContext from "../../context/userContext.jsx";



const Main = () =>{
    const [user, setUser] = useContext(UserContext)
    const [isPending, setPending] = useState(true)
    const navigate = useNavigate()

    // AUTHENTIFIZIERUNG VOM COOKIE
    useEffect(() => {
        setPending(true)
        fetch(`${host}/users/checklogin`,{
            credentials:"include"
        })
        .then((response) => response.json())
        .then((json) => {
            if(json.status){
                setUser(json.user)
                setPending(false)
            }else{
                navigate("/login")
            }
        });  
    },[])

    return( !isPending && 
        <>
            < Navbar />
            < LogoS />
            < Routes>
                <Route path="/" element={<Start/>} />
                <Route path="/efjm" element={<EFJM />} />

                {/* ROUTES USER */}
                <Route path="/community" element={<Community/>} />
                <Route path="/efjm" element={<EFJM />} />
                <Route path="/projectdetails/:id" element={<ProjectDetails/>} />
                <Route path="/userdetails/:id" element={<UserDetails/>}/>
                <Route path="/userdetails/:id" element={<UserDetails />} />
                <Route path="/useredit/:id" element={<UserEdit />} />

                {/* ROUTES PROJECTS */}
                <Route path="/createproject" element={<CreateProject />} />
                <Route path="/myprojects" element={<MyProjects />} />
                <Route path="/projectdetails" element={<ProjectDetails />} />
                <Route path="/starprojects" element={<StarProjects/>} />

                {/* ROUTES RECRUITER */}
                <Route path="/newsearch" element={<NewSearch />}/>
                <Route path="/searchhistory" element={<SearchHistory />} />

                {/* ROUTES NAVBAR */}
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/messages" element={<Messages />} />
            </Routes>
        </>
    )
}

export default Main;