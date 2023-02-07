import {RxCross2} from "react-icons/rx"
import {HiPlus} from "react-icons/hi"
import { host } from "../../api/host.jsx";
import { toast } from "react-toastify";

import { useContext } from "react";

//CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";


//FOLLOW ADDEN
const handleAddFollow = async (talent, user, trigger, setTrigger) => {
  await fetch(`${host}/users/follow/add`, {
  credentials:"include",
  method: 'PATCH',
  body: JSON.stringify({
    follUserId: talent._id, 
    userId: user._id
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    if(json.status){
      toast.info(`you added ${talent.profile?.firstName}`)
      setTrigger(!trigger)
    }else{
      toast.info(`something went wrong!`)
    }
  });
}

// FOLLOW LÖSCHEN
const handleDeleteFollow = async (talent, user, trigger, setTrigger) => {
  await fetch(`${host}/users/follow/delete`, {
    credentials:"include",
    method: 'DELETE',
    body: JSON.stringify({
      follUserId: talent._id, 
      userId: user._id    
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
})
  .then((response) => response.json())
  .then((json) =>{
    if(json.status){
      toast.info(`you deleted ${talent?.profile?.firstName}`)
      setTrigger(!trigger)
    }else{
      toast.info(`something went wrong!`)
    }
  });
}

const FollowBtn = ({talent, user}) => {
  const [trigger, setTrigger] = useContext(TriggerContext)
  return ( user.follows.find(follow => follow._id === talent._id) ? 
    <button className="action" onClick={() => handleDeleteFollow(talent, user, trigger, setTrigger)}><RxCross2 /></button> : 
    <button className="action" onClick={() => handleAddFollow(talent, user, trigger, setTrigger)}><HiPlus /></button>
  )
}

export {FollowBtn}