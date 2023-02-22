import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { TalentCard, TalentCardS } from "./TalentCard.jsx";
import UserContext from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const StoneCard = ({ stone, project }) => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);
  // const [isPending, setPending] = useState(true);
  // const [stone, setStone] = useState({});
  const bg = user.meta.colorTheme[1];
  const teamMember = stone.team.find((member) => member._id === user._id);

  const date =
    stone.createdAt.slice(8, 10) +
    "-" +
    stone.createdAt.slice(6, 8) +
    stone.createdAt.slice(0, 4);

  return (
    <div>
      <div className="x">
        <p>What happened?</p>
        <p>{stone.description}</p>
        {/* <div>
          {!stone.media[0] ? null : stone.contentType.includes("image") ? (
            <img src={stone.media[0]} />
          ) : (
            <ReactPlayer
              url={stone.media[0]}
              playing={false}
              controls={true}
              light={false}
              // playIcon={noch keine Ahnung}
              volume={null}
              muted={true}
              width="100%"
              height="100%"
              pip={true}
              stopOnUnmount={false}
            />
          )}
        </div> */}
        <div>
          {stone.team.map((member) => (
            <TalentCardS key={member._id} talent={member} user={user} />
          ))}
        </div>
        {teamMember && (
          <button
            className={bg}
            onClick={() => navigate(`/editstone/${project._id}/${stone._id}`)}
          >
            {" "}
            edit stone
          </button>
        )}
      </div>
    </div>
  );
};

export default StoneCard;
