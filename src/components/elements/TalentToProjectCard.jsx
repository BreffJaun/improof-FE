import { useNavigate } from "react-router-dom";

// STYLES
import "../../styles/cards.scss";
import "../../styles/colors.scss";
import "../../styles/talentcard.scss";

// ICONS
import { ToastContainer } from "react-toastify";

const TalentToProjectCard = ({ talent, user, team, setTeam, projectEdit }) => {
  const bg = talent.meta.colorTheme[1];
  const color = talent.meta.colorTheme[0];
  const navigate = useNavigate();

  const addToTeam = (event) => {
    event.preventDefault();
    setTeam([...team, talent]);    
  };
  
  const deleteFromTeam = (event) => {
    event.preventDefault();
    setTeam(team.filter((member) => member._id !== talent._id));
  };

  const checkTeam = team?.find(member=> member._id === talent._id);

  // console.log("team: ", team)
  // console.log("talent._id: ", talent._id)
  // console.log("checkTeam: ", checkTeam)

  return (
    <>
      <div className="t-card rel">
        <div className="t-avatar">
          <div
            className="bg-FAV central t-pic"
            onClick={() => navigate(`/userDetails/${talent._id}`)}
          >
            {talent?.profile?.avatar ? (
              <img src={talent.profile?.avatar} />
            ) : (
              <p className="initials">{talent.profile?.initials}</p>
            )}
          </div>
        </div>
        <div className="t-info">
          <p
            className={`fw500 ${color}`}
            onClick={() => navigate(`/userDetails/${talent._id}`)}
          >
            {talent.profile?.firstName} {talent.profile?.lastName}
          </p>
          <p>{talent.profile?.category}</p>
        </div>
        {!checkTeam ? (
          <div className="w100 abs b0">
            <button className={bg} onClick={addToTeam}>
              add
            </button>
          </div>
        ) : (
          <div className="w100 abs b0">
            <button className={bg} onClick={deleteFromTeam}>
              delete
            </button>
          </div>
        )}
      </div>
      <ToastContainer />
    </>
  );
};
export { TalentToProjectCard };
