import { useContext, useEffect } from "react";
import { host } from "../../api/host.jsx";

import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";

// COMPONENTS
import { ProjectCard } from "../elements/ProjectCard.jsx";
import Footer from "../elements/Footer.jsx";

const MyProjects = () => {
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const color = user.meta.colorTheme[0];
  const darkMode = user.meta.darkMode;

  useEffect(() => {
    const getUser = async () => {
      await fetch(`${host}/users/${user._id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => setUser(json.userData));
    };
    getUser();
  }, [trigger]);

  return (
    <div className="max">
      <div className="mb2">
        <h1 className={`central ${color} mb2`}>my projects</h1>
        <div className="projects-container">
          {user?.myProjects?.map((project) => (
            <ProjectCard
              project={project}
              user={user}
              key={project._id}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default MyProjects;
