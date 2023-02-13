import { useNavigate } from "react-router-dom"

// STYLES
import "../../styles/cards.scss"
import "../../styles/colors.scss"
import "../../styles/talentcard.scss"

// ICONS
import { ToastContainer } from "react-toastify"



const TalentToProjectCard = ({talent, user, team, setTeam}) => {
  const navigate = useNavigate()
  const addToTeam = () =>{
    setTeam([...team, talent._id])
  }
  const deleteFromTeam = () => {
    setTeam(team.filter((member) => member !== talent._id ));
  }

  const checkTeam = team?.includes(talent._id)

  return (
    <>
      <div className="t-card rel" >
        <div className="t-avatar">
          <div className="bg-FAV central t-pic" onClick={()=> navigate(`/userDetails/${talent._id}`)}>
            { talent?.profile?.avatar? 
              <img src={talent.profile?.avatar} /> : 
              <p className="initials">{talent.profile?.initials}</p> }
          </div>
        </div>
        <div className="t-info">
          <p className="fw500 c-FAV" onClick={()=> navigate(`/userDetails/${talent._id}`)}>{talent.profile?.firstName} {talent.profile?.lastName}</p>
          <p>{talent.profile?.toolsAndSkills}</p>
        </div>
        { !checkTeam ? 
          <div className="w100 abs b0">
            <button onClick={addToTeam}
            >add to project</button>
          </div> :
          <div className="w100 abs b0">
            <button onClick={deleteFromTeam}
            >delete from project</button>
          </div>
        }
      </div>
      <ToastContainer/>
    </>
  );
};
export {TalentToProjectCard};