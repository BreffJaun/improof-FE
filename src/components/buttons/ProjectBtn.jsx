import { RxCross2 } from "react-icons/rx";
import { HiPlus } from "react-icons/hi";
import { host } from "../../api/host.jsx";
import { toast } from "react-toastify";

import { useContext } from "react";

//CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";
import UserContext from "../../context/userContext.jsx";
import DarkModeContext from "../../context/darkModeContext.jsx";

const handleAddFollow = async (project, user, setUser) => {
  await fetch(`${host}/projects/follow/add`, {
    credentials: "include",
    method: "PATCH",
    body: JSON.stringify({
      userId: user._id,
      projectId: project._id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.status) {
        setUser(json.data);
        toast.info(`you added the ${project.name} to you favorites`);
      } else {
        toast.info(`something went wrong`);
      }
    });
};

const handleDeleteFollow = async (project, user, setUser) => {
  await fetch(`${host}/projects/follow/delete`, {
    credentials: "include",
    method: "DELETE",
    body: JSON.stringify({
      userId: user._id,
      projectId: project._id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json.status) {
        setUser(json.data);
        toast.info(`you deleted the ${project.name} from you favorites`);
      } else {
        toast.info(`something went wrong`);
      }
    });
};
const ProjectBtn = ({ project }) => {
  const [user, setUser] = useContext(UserContext);
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return user.starProjects.find((projekt) => projekt._id === project._id) ? (
    <button
      className={darkMode ? `action-dark` : `action-light`}
      onClick={() => handleDeleteFollow(project, user, setUser)}
    >
      <RxCross2 />
    </button>
  ) : (
    <button
      className={darkMode ? `action-dark` : `action-light`}
      onClick={() => handleAddFollow(project, user, setUser)}
    >
      <HiPlus />
    </button>
  );
};

export default ProjectBtn;
