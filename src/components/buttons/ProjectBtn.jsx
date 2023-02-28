import { host } from "../../api/host.jsx";
import { toast } from "react-toastify";
import { useContext, useState } from "react";

// CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";
import UserContext from "../../context/userContext.jsx";

// ICONS
import { RxCross2 } from "react-icons/rx";
import { HiPlus } from "react-icons/hi";
import { AiOutlineStar as OLstar } from "react-icons/ai";
import { AiFillStar as FIstar } from "react-icons/ai";

// STYLES
import "../../styles/toastify.scss";

// LOGOS
import logoPi from "../../images/improof_PI.png";
import logoBl from "../../images/improof_BL.png";
import logoPu from "../../images/improof_PU.png";
import logoOr from "../../images/improof_OR.png";
import logoLB from "../../images/improof_LB.png";
import logoDG from "../../images/improof_DG.png";
import logoGR from "../../images/improof_GR.png";
import logoLG from "../../images/improof_LG.png";
const ProjectBtn = ({ project }) => {
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const darkMode = user.meta.darkMode;
  const theme = darkMode ? "dark" : "light";

  const handleAddFollow = async (
    project,
    user,
    setUser,
    setTrigger,
    trigger
  ) => {
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
          toast(`you added ${project.name} to you favorite projects`, {
            theme: theme,
            hideProgressBar: "true",
            icon: () => (
              <img
                src={
                  color === "c-PI1"
                    ? logoPi
                    : color === "c-O2"
                    ? logoOr
                    : color === "c-PU1"
                    ? logoPu
                    : color === "c-B2"
                    ? logoBl
                    : color === "c-LB2"
                    ? logoLB
                    : color === "c-GR1"
                    ? logoLG
                    : color === "c-GR3"
                    ? logoGR
                    : logoDG
                }
                width="20"
              />
            ),
          });
          setTrigger(!trigger);
        } else {
          toast(`something went wrong`, {
            theme: theme,
            hideProgressBar: "true",
            icon: () => (
              <img
                src={
                  color === "c-PI1"
                    ? logoPi
                    : color === "c-O2"
                    ? logoOr
                    : color === "c-PU1"
                    ? logoPu
                    : color === "c-B2"
                    ? logoBl
                    : color === "c-LB2"
                    ? logoLB
                    : color === "c-GR1"
                    ? logoLG
                    : color === "c-GR3"
                    ? logoGR
                    : logoDG
                }
                width="20"
              />
            ),
          });
        }
      });
  };

  const handleDeleteFollow = async (
    project,
    user,
    setUser,
    setTrigger,
    trigger
  ) => {
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
          toast(`you deleted ${project.name} from you favorite projects`, {
            theme: theme,
            hideProgressBar: "true",
            icon: () => (
              <img
                src={
                  color === "c-PI1"
                    ? logoPi
                    : color === "c-O2"
                    ? logoOr
                    : color === "c-PU1"
                    ? logoPu
                    : color === "c-B2"
                    ? logoBl
                    : color === "c-LB2"
                    ? logoLB
                    : color === "c-GR1"
                    ? logoLG
                    : color === "c-GR3"
                    ? logoGR
                    : logoDG
                }
                width="20"
              />
            ),
          });
          setTrigger(!trigger);
        } else {
          toast(`something went wrong`, {
            theme: theme,
            hideProgressBar: "true",
            icon: () => (
              <img
                src={
                  color === "c-PI1"
                    ? logoPi
                    : color === "c-O2"
                    ? logoOr
                    : color === "c-PU1"
                    ? logoPu
                    : color === "c-B2"
                    ? logoBl
                    : color === "c-LB2"
                    ? logoLB
                    : color === "c-GR1"
                    ? logoLG
                    : color === "c-GR3"
                    ? logoGR
                    : logoDG
                }
                width="20"
              />
            ),
          });
        }
      });
  };

  return user.starProjects.find((projekt) => projekt._id === project._id) ? (
    <div title="delete ">
      <button
        className="action color"
        onClick={() =>
          handleDeleteFollow(project, user, setUser, setTrigger, trigger)
        }
      >
        <FIstar />
      </button>
    </div>
  ) : (
    <div title="add to favourites">
      <button
        className="action"
        onClick={() =>
          handleAddFollow(project, user, setUser, setTrigger, trigger)
        }
      >
        <OLstar />
      </button>
    </div>
  );
};

export default ProjectBtn;
