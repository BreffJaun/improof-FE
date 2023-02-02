import "../../styles/cards.scss"
import "../../styles/colors.scss"

import { host } from "../../api/host.jsx"
import { useNavigate } from "react-router-dom"

// ICONS
import {RxCross2} from "react-icons/rx"
import {HiPlus} from "react-icons/hi"
import { toast, ToastContainer } from "react-toastify"

// ELEMENTE
import { FollowAddBtn, FollowDeleteBtn } from "../buttons/FollowBtn.jsx"
import { SendMessageBtn } from "../buttons/MessageBtn.jsx"



// FOLLOW LÖSCHEN
const handleDeleteFollow = async (talentId, userId, firstName) => {
  fetch(`${host}/users/follow/delete`, {
  method: 'DELETE',
  body: JSON.stringify({
    talentId, 
    userId    
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) =>{
    if(json.status){
      toast.info(`you deleted ${firstName}`)
    }else{
      toast.info(`something went wrong!`)
    }
  });
}




const TalentCardFollow = ({follower, userId}) => {
  console.log(follower);
  console.log(userId);
  return (
    <div className="card talent flex" onClick={()=> navigate(`/userDetails/${talentId}`)}>
      <div className="circle50 bg-FAV">
        { follower?.profile?.avatar? <img src={follower.profile.avatar} width="50"/> : <p>{follower?.profile?.initials}</p> }
      </div>
      <div>
        <p className="c-FAV">{follower?.profile?.firstName} {follower?.profile?.lastName}</p>
        <p className="c-A20">{follower?.profile?.position}</p>
      </div>
      <div className="flex">
        <button className="action" onClick={() => handleMessage(follower?.profile?._id, userId, follower?.profile?.firstName)}><FiSend /></button>
        <button className="action" onClick={()=> handleDeleteFollow(follower?.profile?._id, userId, follower?.profile?.firstName)}><RxCross2 /></button>
      </div>
    </div>
  );
};

const TalentCardAdd = ({follower, userId}) => {
  return (
<div className="card talent flex" onClick={()=> navigate(`/userDetails/${talentId}`)}>
      <div className="circle50 bg-FAV">
        { follower?.profile?.avatar? <img src={follower?.profile?.avatar} width="50"/> : <p>{follower?.profile?.initials}</p> }
      </div>
      <div>
        <p className="c-FAV">{follower?.profile?.firstName} {follower?.profile?.lastName}</p>
        <p className="c-A20">{follower?.profile?.position}</p>
      </div>
      <div className="flex">
        <button className="action" onClick={() => handleMessage(follower?.profile?._id, userId, follower?.profile?.firstName)}><FiSend /></button>
        <button className="action" onClick={() => handleAddFollow(follower?.profile?._id, userId)}><HiPlus /></button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export {TalentCardFollow, TalentCardAdd};