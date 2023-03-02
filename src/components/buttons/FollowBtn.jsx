import { host } from "../../api/host.jsx";
import { toast } from "react-toastify";
import { useContext, useState } from "react";

//CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";

// ICONS
import { RxCross2 } from "react-icons/rx";
import { HiPlus } from "react-icons/hi";
import { AiOutlineStar as OLstar } from "react-icons/ai";
import { AiFillStar as FIstar } from "react-icons/ai";

// LOGOS
import logoPi from "../../images/improof_PI.png";
import logoBl from "../../images/improof_BL.png";
import logoPu from "../../images/improof_PU.png";
import logoOr from "../../images/improof_OR.png";
import logoLB from "../../images/improof_LB.png";
import logoDG from "../../images/improof_DG.png";
import logoGR from "../../images/improof_GR.png";
import logoLG from "../../images/improof_LG.png";

// STYLES
import "../../styles/toastify.scss";

const FollowBtn = ({ talent, user, theme }) => {
  const toastOptions = {
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
  };

  const darkMode = user.meta.darkMode;
  const color = user.meta.colorTheme[0];

  const handleAddFollow = async (talent, user, trigger, setTrigger) => {
    await fetch(`${host}/users/follow/add`, {
      credentials: "include",
      method: "PATCH",
      body: JSON.stringify({
        follUserId: talent._id,
        userId: user._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          toast(`you added ${talent.profile?.firstName}`, toastOptions);
          setTrigger(!trigger);
        } else {
          toast(`something went wrong!`, toastOptions);
        }
      });
  };

  // FOLLOW LÖSCHEN
  const handleDeleteFollow = async (talent, user, trigger, setTrigger) => {
    await fetch(`${host}/users/follow/delete`, {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({
        follUserId: talent._id,
        userId: user._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          toast(`you deleted ${talent?.profile?.firstName}`, toastOptions);
          setTrigger(!trigger);
        } else {
          toast(`something went wrong!`, toastOptions);
        }
      });
  };

  const bg = talent.meta.colorTheme[1];

  const [trigger, setTrigger] = useContext(TriggerContext);

  return user.follows.find((follow) => follow._id === talent._id) ? (
    <button
      title="click to unfollow"
      className={`action ${bg}`}
      onClick={() => handleDeleteFollow(talent, user, trigger, setTrigger)}
    >
      <FIstar />
    </button>
  ) : (
    <button
      title="click to follow"
      className={`action ${bg}`}
      onClick={() => handleAddFollow(talent, user, trigger, setTrigger)}
    >
      <OLstar />
    </button>
  );
};

export { FollowBtn };
