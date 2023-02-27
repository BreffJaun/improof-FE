import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { TalentCard, TalentCardS } from "./TalentCard.jsx";
import UserContext from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const StoneCard = ({ stone, project, theme }) => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);
  // const [isPending, setPending] = useState(true);
  // const [stone, setStone] = useState({});
  const bg = user.meta.colorTheme[1];
  const color = user.meta.colorTheme[0];
  const teamMember = stone.team.find((member) => member._id === user._id);

  const date =
    stone.createdAt.slice(8, 10) +
    "-" +
    stone.createdAt.slice(6, 8) +
    stone.createdAt.slice(0, 4);

  return (
    <div className="bo-top-DARK mt15">
      <div className="mt2">
        <p className={`${color} center`}>achievement:</p>
        <p className="center">{stone.description}</p>
        <div>
          {stone.team.map((member) => (
            <TalentCardS
              key={member._id}
              talent={member}
              user={user}
              theme={theme}
            />
          ))}
        </div>
        {teamMember && (
          <button
            className={`${bg} center mt1 mb1`}
            onClick={() => navigate(`/editstone/${project._id}/${stone._id}`)}
          >
            {" "}
            edit
          </button>
        )}
      </div>
    </div>
  );
};

export default StoneCard;
