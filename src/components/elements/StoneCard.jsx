import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { TalentCard } from "./TalentCard.jsx";
import UserContext from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

const StoneCard = (props) => {
  const navigate = useNavigate();

  const [user, steUser] = useContext(UserContext);
  const [isPending, setPending] = useState(true);
  const [stone, setStone] = useState({});
  const bg = user.meta.colorTheme[1];
  console.log("user", user);
  const teamMember = props.projectTeam.find(
    (member) => member._id === user._id
  );

  const date =
    props.createdAt.slice(8, 10) +
    "-" +
    props.createdAt.slice(6, 8) +
    props.createdAt.slice(0, 4);

  // useEffect(() => {
  //   setPending(true);
  //   const fetchStone = async () => {
  //     fetch(`${host}/stones/${props.id}`, {
  //       credentials: "include",
  //     })
  //       .then((response) => response.json())
  //       .then((json) => {
  //         console.log(json);
  //         if (json.status) {
  //           setStone(json.data);
  //           setPending(false);
  //           console.log(json.data.createdAt);
  //         }
  //       });
  //   };
  //   fetchStone();
  // }, []);
  return (
    <div className="news-container">
      <h1>{props.title}</h1>

      <h3>
        This is a <b>{props.kind.toUpperCase()}</b> created at {date}
      </h3>
      <div>{props.media}</div>
      <h6>{props.description}</h6>

      <div>
        {props.team.map((member) => (
          <TalentCard key={member._id} talent={member} user={user} />
        ))}
      </div>
      {teamMember && (
        <button
          className={bg}
          onClick={() => navigate(`/editstone/${props.projectId}/${props.id}`)}
        >
          {" "}
          edit stone
        </button>
      )}
    </div>
  );
};

export default StoneCard;
