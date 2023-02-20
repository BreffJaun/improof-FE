import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { TalentCard } from "./TalentCard.jsx";
import UserContext from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const StoneCard = ({stone}) => {
  const navigate = useNavigate();

  const [user, setUser] = useContext(UserContext);
  // const [isPending, setPending] = useState(true);
  // const [stone, setStone] = useState({});
  const bg = user.meta.colorTheme[1];
  const teamMember = stone.team.find(
    (member) => member._id === user._id
  );

  const date =
    stone.createdAt.slice(8, 10) +
    "-" +
    stone.createdAt.slice(6, 8) +
    stone.createdAt.slice(0, 4);

  return (
    <div className="news-container">
      <div className="projects-container">
        <h1>{stone.title}</h1>
        <h6>{stone.description}</h6>

        <h3>
          This is a <b>{stone.kind.toUpperCase()}</b> created at {date} by
        </h3>
        <div>
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
        </div>
        <div>
          {stone.team.map((member) => (
            <TalentCard key={member._id} talent={member} user={user} />
          ))}
        </div>
        {teamMember && (
          <button
            className={bg}
            onClick={() =>
              navigate(`/editstone/${stone.projectId}/${stone.id}`)
            }
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
