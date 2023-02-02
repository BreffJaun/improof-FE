import "../../styles/cards.scss"
import "../../styles/colors.scss"

import { host } from "../../api/host.jsx"

// ICONS
import {RxCross2} from "react-icons/rx"
import {HiPlus} from "react-icons/hi"
import {FiSend} from "react-icons/fi"
import { toast } from "react-toastify"


//FOLLOW ADDEN
const handleAddFollow = async (talentId, userId, firstName) => {
  fetch(`${host}/users/follow/add`, {
  method: 'POST',
  body: JSON.stringify({
    talentId, 
    userId    
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    if(json.status){
      toast.info(`you added ${firstName}`)
    }else{
      toast.info(`something went wrong!`)
    }
  });
}

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

//SEND MESSAGE
const handleMessage = async (talentId, userId) => {

}


const TalentCardFollow = ({follower, userId}) => {
  console.log(follower);
  console.log(userId);
  return (
    <div className="card talent flex">
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
<div className="card talent flex">
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
    </div>
  );
};

export {TalentCardFollow, TalentCardAdd};