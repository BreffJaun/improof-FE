import {RxCross2} from "react-icons/rx"
import {HiPlus} from "react-icons/hi"
import { host } from "../../api/host.jsx";
import { ToastContainer, toast } from "react-toastify";

//FOLLOW ADDEN
const handleAddFollow = async (talentId, userId, firstName) => {
  await fetch(`${host}/users/follow/add`, {
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
  await fetch(`${host}/users/follow/delete`, {
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

const FollowAddBtn = ({talentId, userId, firstName}) => {
  return (
    <button className="action" onClick={() => handleAddFollow(talentId, userId, firstName)}><HiPlus /></button>
  );
};

const FollowDeleteBtn = ({talentId, userId, firstName}) => {
  return (
    <button className="action" onClick={() => handleDeleteFollow(talentId, userId, firstName)}><RxCross2 /></button>

  )
}


export {FollowAddBtn, FollowDeleteBtn}