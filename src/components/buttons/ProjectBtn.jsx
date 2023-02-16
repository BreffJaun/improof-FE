import { host } from "../../api/host.jsx";
import { toast } from "react-toastify";
import { useContext } from "react";

// CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";
import UserContext from "../../context/userContext.jsx";

// ICONS
import { RxCross2 } from "react-icons/rx";
import { HiPlus } from "react-icons/hi";
import { AiOutlineStar as OLstar } from "react-icons/ai"
import { AiFillStar as FIstar } from "react-icons/ai"


const handleAddFollow = async (project, user, setUser, setTrigger, trigger) => {
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
        setTrigger(!trigger)
      } else {
        toast.info(`something went wrong`);
      }
    });
};

const handleDeleteFollow = async (project, user, setUser, setTrigger, trigger) => {

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
        setTrigger(!trigger)
      } else {
        toast.info(`something went wrong`);
      }
    });
};
const ProjectBtn = ({ project }) => {
  const [user, setUser] = useContext(UserContext);
  const color = user.meta.colorTheme[0]
  const bg = user.meta.colorTheme[1]
  const [trigger, setTrigger] = useContext(TriggerContext)

  return user.starProjects.find((projekt) => projekt._id === project._id) ? (
    <div title="delete ">
      <button
        className="action color"
        onClick={() => handleDeleteFollow(project, user, setUser, setTrigger, trigger)}
      >
        <FIstar />
      </button>
    </div>
  ) : (
    <div title="add to favourites">
        <button
        className="action"
        onClick={() => handleAddFollow(project, user, setUser, setTrigger, trigger)}
      >
        <OLstar />
      </button>
    </div>
  );
};

export default ProjectBtn;
