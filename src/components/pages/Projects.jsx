import { host } from "../../api/host.jsx";
import { useContext, useState, useEffect } from "react";

// CONTEXT
import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";

// COMPONENTS
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import { ProjectCard } from "../elements/ProjectCard.jsx";
import Footer from "../elements/Footer.jsx";

// STYLES
import "../../styles/projects.scss";

const StarProjects = () => {
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const [projects, setProjects] = useState([]);
  const [pending, setPending] = useState(true);
  const [category, setCategory] = useState("");
  const color = user.meta.colorTheme[0];
  const darkMode = user.meta.darkMode;

  useEffect(() => {
    const getProjects = async () => {
      await fetch(`${host}/projects`)
        .then((response) => response.json())
        .then((json) => setProjects(json));
    };

    const getUser = async () => {
      await fetch(`${host}/users/${user._id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          setUser(json.userData);
          setPending(false);
        });
    };

    getUser();
    getProjects();
  }, [trigger]);

  // console.log(category)
  return (
    !pending && (
      <div className="max">
        <h1 className={`center ${color} mb2`}>your star projects</h1>
        <div className="projects-container">
          {category
            ? user?.starProjects.map(
                (project) =>
                  project.category === category && (
                    <ProjectCard
                      key={project._id}
                      user={user}
                      project={project}
                      darkMode={darkMode}
                    />
                  )
              )
            : user?.starProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  darkMode={darkMode}
                  user={user}
                  project={project}
                />
              ))}
        </div>

        <div className="bo-DARK central rel"></div>
        <h1 className={`center ${color} mt2 mb2`}>all projects</h1>
        <div className="central">
          <CategoriesFilter setCategory={setCategory} />
        </div>
        <div className="projects-container">
          {category
            ? projects.map(
                (project) =>
                  project.category === category && (
                    <ProjectCard
                      key={project._id}
                      user={user}
                      project={project}
                      darkMode={darkMode}
                    />
                  )
              )
            : projects &&
              projects.map((project) => {
                const alreadyFollowing = user.starProjects.find(
                  (starProject) => starProject._id === project._id
                );
                return (
                  !alreadyFollowing && (
                    <ProjectCard
                      key={project._id}
                      user={user}
                      project={project}
                      darkMode={darkMode}
                    />
                  )
                );
              })}
        </div>
        <Footer />
      </div>
    )
  );
};

export default StarProjects;
