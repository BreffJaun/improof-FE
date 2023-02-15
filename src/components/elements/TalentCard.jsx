import { useNavigate } from "react-router-dom"

// STYLES
import "../../styles/cards.scss"
import "../../styles/colors.scss"
import "../../styles/talentcard.scss"

// ICONS
import { ToastContainer } from "react-toastify"

// ELEMENTS
import { FollowBtn } from "../buttons/FollowBtn.jsx"
import { SendMessageBtn } from "../buttons/MessageBtn.jsx"

const TalentCard = ({talent, user}) => {
  const navigate = useNavigate()
  return (
    <>
      <div className="t-card" >
        <div className="t-avatar">
          <div className="bg-FAV central t-pic" onClick={()=> navigate(`/userDetails/${talent._id}`)}>
            { talent?.profile?.avatar? 
              <img src={talent.profile?.avatar} /> : 
              <p className="initials">{talent.profile?.initials}</p> }
          </div>
        </div>
        <div className="t-info">
            <p className="fw500 c-FAV" onClick={()=> navigate(`/userDetails/${talent._id}`)}>{talent.profile?.firstName} {talent.profile?.lastName}</p>
            <p>{talent.profile?.position}</p>
            <p>{talent.profile?.toolsAndSkills}</p>
        </div>

        <div className="t-community">
          <div title="send message">
            <SendMessageBtn talent={talent} user={user} />
          </div>
          <div>
            {user.follows.find(follow => follow._id === talent._id) ? <FollowBtn talent={talent} user={user}/> : <FollowBtn  talent={talent} user={user}/>}
          </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};
export {TalentCard};