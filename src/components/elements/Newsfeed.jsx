import { host } from "../../api/host.jsx";
import { useContext, useEffect, useSate, useState } from "react";

// ELEMENTE
import { MyProjectCard } from "./ProjectCard.jsx";

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

  console.log(projects);
  console.log(trigger);
  return (
    <div className="mt2">
      <p className="sl c-FAV">newsFeed</p>
      {projects.map((project) => {
        return <MyProjectCard project={project} user={user} />;
      })}
    </div>
  );
};

export default Newsfeed;
