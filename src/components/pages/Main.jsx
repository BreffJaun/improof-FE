import { useNavigate, Route, Routes } from "react-router";
import { useEffect, useState, useContext } from "react";
import { host } from "../../api/host.jsx";
import TalentMenu from "../TalentMenu.jsx";
import RecruiterMenu from "../RecruiterMenu.jsx";

// NAVBAR-COMPONENTEN
import Navbar from "../elements/Navbar.jsx";
import Notifications from "./Notifications.jsx";
import Messages from "./Messages";

// COMPONENTS
import Start from "./Start.jsx";
import { LogoL, LogoS } from "../Logo.jsx";
import CreateProject from "./CreateProject.jsx";
import MyProjects from "./MyProjects.jsx";
import Projects from "./Projects.jsx";
import Community from "./Community.jsx";
import SearchHistory from "./SearchHistory.jsx";
import NewSearch from "./NewSearch.jsx";
import ProjectDetails from "./ProjectDetails.jsx";
import ProjectEdit from "./ProjectEdit.jsx";
import UserDetails from "./UserDetails.jsx";
import UserEdit from "./UserEdit.jsx";
import Conversations from "./Conversations.jsx";
import CreateStone from "./CreateStone.jsx";
import EditStone from "./EditStone.jsx";
import StoneCard from "../elements/StoneCard.jsx";
import Congrats from "../elements/Congrats.jsx";
import Sidebar from "../elements/Sidebar.jsx";

// FOOTER-COMPONENTEN
import EFJM from "./EFJM";

//CONTEXT
import UserContext from "../../context/userContext.jsx";
import { ToastContainer } from "react-toastify";

const Main = ({ modeTrigger, setModeTrigger }) => {
  const [user, setUser] = useContext(UserContext);
  const [isPending, setPending] = useState(true);
  // const [modeTrigger, setModeTrigger] = useState(false)
  const navigate = useNavigate();
  const mode = user?.meta?.darkMode;

  // AUTHENTIFIZIERUNG VOM COOKIE
  useEffect(() => {
    setPending(true);
    fetch(`${host}/users/checklogin`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          setUser(json.user);
          setPending(false);
          if (json.user?.meta?.loginCount === 1) {
            navigate("/congrats");
          }
        } else {
          navigate("/login"); 
        }
      });
  }, [modeTrigger]);

  return (
    !isPending && (
      <>
        <Navbar
          user={user}
          setModeTrigger={setModeTrigger}
          modeTrigger={modeTrigger}
        />
        {/* <Sidebar /> */}
        {/* <LogoS /> */}
        <div className="content-scroll-container">
          <div className="max1300">
            <Routes>
              <Route path="/" element={<Start />} />
              <Route path="/efjm" element={<EFJM />} />

              {/* ROUTES USER */}
              <Route path="/community" element={<Community />} />
              <Route path="/efjm" element={<EFJM />} />
              <Route path="/userdetails/:id" element={<UserDetails />} />
              <Route path="/useredit/:id" element={<UserEdit />} />

              {/* ROUTES PROJECTS */}
              <Route path="/createproject" element={<CreateProject />} />
              <Route path="/myprojects" element={<MyProjects />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projectdetails/:id" element={<ProjectDetails />} />
              <Route path="/projectedit/:id" element={<ProjectEdit />} />
              <Route path="/createStone/:projectId" element={<CreateStone />} />
              <Route
                path="/editstone/:projectId/:stoneId"
                element={<EditStone />}
              />
              <Route path="/:stoneId" element={<StoneCard />} />

              {/* ROUTES RECRUITER */}
              <Route path="/newsearch" element={<NewSearch />} />
              <Route path="/searchhistory" element={<SearchHistory />} />

              {/* ROUTES NAVBAR */}
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages/:id" element={<Messages />} />
              <Route path="/conversations" element={<Conversations />} />
              <Route path="/congrats" element={<Congrats />} />
            </Routes>
            </div>
          </div>
        <ToastContainer />
      </>
    )
  );
};

export default Main;
