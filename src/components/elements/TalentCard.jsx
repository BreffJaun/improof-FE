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




const TalentCardFollow = ({firstName, lastName, position, img, initials, talentId, userId}) => {
  const navigate = useNavigate()
  return (
    <div className="card talent flex" onClick={()=> navigate(`/userDetails/${talentId}`)}>
      <div className="circle50 bg-FAV">
        { img ? <img src={img} width="50"/> : <p>{initials}</p> }
      </div>
      <div>
        <p className="c-FAV">{firstName} {lastName}</p>
        <p className="c-A20">{position}</p>
      </div>
      <div className="flex">

        <SendMessageBtn talentId={talentId} userId={userId} firstName={firstName}/>  
              
        <FollowDeleteBtn talentId={talentId} userId={userId} firstName={firstName}/>
        
      </div>
    </div>
  );
};

const TalentCardAdd = ({firstName, lastName, position, img, initials, talentId, userId}) => {
  const navigate = useNavigate()
  return (
<div className="card talent flex" onClick={()=> navigate(`/userDetails/${talentId}`)}>
      <div className="circle50 bg-FAV">
        { img ? <img src={img} width="50"/> : <p>{initials}</p> }
      </div>
      <div>
        <p className="c-FAV">{firstName} {lastName}</p>
        <p className="c-A20">{position}</p>
      </div>
      <div className="flex">

        <SendMessageBtn talentId={talentId} userId={userId} firstName={firstName}/>

        <FollowAddBtn talentId={talentId} userId={userId} firstName={firstName}/>

      </div>
      <ToastContainer/>
    </div>
  );
};

export {TalentCardFollow, TalentCardAdd};