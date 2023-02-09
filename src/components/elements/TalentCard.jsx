import "../../styles/cards.scss"
import "../../styles/colors.scss"

import { useNavigate } from "react-router-dom"

// ICONS
import { ToastContainer } from "react-toastify"

// ELEMENTE
import { FollowBtn } from "../buttons/FollowBtn.jsx"
import { SendMessageBtn } from "../buttons/MessageBtn.jsx"

import { FiSend } from "react-icons/fi"




const TalentCard = ({talent, user}) => {
  
  const navigate = useNavigate()
  return (
    <>
      <div className="card talent" >
        <div className="flex central">
          <div className="circle50 bg-FAV central" onClick={()=> navigate(`/userDetails/${talent._id}`)}>
            { talent?.profile?.avatar? 
              <img src={talent.profile?.avatar} width="50" /> : 
              <p className="initials">{talent.profile?.initials}</p> }
          </div>
          <div className="ml1 col">
            <p onClick={()=> navigate(`/userDetails/${talent._id}`)}>{talent.profile?.firstName} {talent.profile?.lastName}</p>
            <p className="c-A80">{talent.profile?.position}</p>
            <p className="c-A80">{talent.profile?.toolsAndSkills}</p>
          </div>
        </div>

        <div className="flex">
          <SendMessageBtn talent={talent} user={user} />
          {user.follows.find(follow => follow._id === talent._id) ? <FollowBtn talent={talent} user={user}/> : <FollowBtn talent={talent} user={user}/>}
        </div>
      </div>
      <ToastContainer/>
    </>
  );
};
export {TalentCard};