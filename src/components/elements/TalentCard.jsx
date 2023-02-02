import "../../styles/cards.scss"
import "../../styles/colors.scss"

import { useNavigate } from "react-router-dom"

// ICONS
import { toast, ToastContainer } from "react-toastify"

// ELEMENTE
import { FollowAddBtn, FollowDeleteBtn } from "../buttons/FollowBtn.jsx"
import { SendMessageBtn } from "../buttons/MessageBtn.jsx"

const TalentCardFollow = ({follower, userId}) => {
  const navigate = useNavigate()
  return (
    <div className="card talent flex" >
      <div className="circle50 bg-FAV" onClick={()=> navigate(`/userDetails/${follower._id}`)}>
        { follower?.profile?.avatar? <img src={follower.profile.avatar} width="50"/> : <p>{follower?.profile?.initials}</p> }
      </div>
      <div>
        <p className="c-FAV" onClick={()=> navigate(`/userDetails/${follower.talentId}`)}>{follower?.profile?.firstName} {follower?.profile?.lastName}</p>
        <p className="c-A20">{follower?.profile?.position}</p>
      </div>
      <div className="flex">

        <SendMessageBtn talentId={follower.TalentId} userId={userId} firstName={follower?.profile?.firstName}/>

        <FollowDeleteBtn talentId={follower.TalentId} userId={userId} firstName={follower?.profile?.firstName}/>      
        </div>
    </div>
  );
};

const TalentCardAdd = ({follower, userId}) => {
  const navigate = useNavigate()
  return (
<div className="card talent flex" >
      <div className="circle50 bg-FAV" onClick={()=> navigate(`/userDetails/${follower._id}`)}>
        { follower?.profile?.avatar? <img src={follower?.profile?.avatar} width="50"/> : <p>{follower?.profile?.initials}</p> }
      </div>
      <div>
        <p className="c-FAV" onClick={()=> navigate(`/userDetails/${follower._id}`)}>{follower?.profile?.firstName} {follower?.profile?.lastName}</p>
        <p className="c-A20">{follower?.profile?.position}</p>
      </div>
      <div className="flex">

        <SendMessageBtn talentId={follower.TalentId} userId={userId} firstName={follower?.profile?.firstName}/>

        <FollowAddBtn talentId={follower.TalentId} userId={userId} firstName={follower?.profile?.firstName}/>

      </div>
      <ToastContainer/>
    </div>
  );
};

export {TalentCardFollow, TalentCardAdd};