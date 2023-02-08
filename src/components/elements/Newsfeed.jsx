import { host } from "../../api/host.jsx";
import { useContext, useEffect, useSate, useState } from "react";

// ELEMENTE
import { ProjectCardNewsFeed } from "./ProjectCard.jsx";

// CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";
import UserContext from "../../context/userContext.jsx";

const Newsfeed = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useState(true);
  const [isPending, setPending] = useState(true);

  useEffect(() => {
    const getProjects = async () => {
      fetch(`${host}/projects`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          setProjects(json);
        });
    };
    getProjects();
  }, []);

  useEffect(() => {
    setPending(true);
    const getUser = async () => {
      fetch(`${host}/users/checklogin`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setUser(json.user);
            setPending(false);
          } else {
            navigate("/login");
          }
        });
    };
  }, [user]);
  const sortedProjects = projects.sort(function (a, b) {
    return (
      new Date(b.createdAt ?? b.updatedAt) -
      new Date(a.createdAt ?? a.updatedAt)
    );
  });
  // Sort will change the initial array
  console.log("projects", projects);
  // console.log("sorted", sortedProjects);
  return (
    <div className="mt2">
      <p className="sl c-FAV">newsFeed</p>
      {projects.slice(0, 10).map((project) => {
        return <ProjectCardNewsFeed project={project} user={user} />;
      })}
    </div>
  );
};

export default Newsfeed;
