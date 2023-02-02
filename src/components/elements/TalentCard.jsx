import "../../styles/cards.scss"
import "../../styles/colors.scss"

import { host } from "../../api/host.jsx"

// ICONS
import {RxCross2} from "react-icons/rx"
import {HiPlus} from "react-icons/hi"
import {FiSend} from "react-icons/fi"
import { toast } from "react-toastify"

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
  .then((json) => toast.info(`you added ${firstName}`));
}
const handleDeleteFollow = async (talentId, userId) => {
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
  .then((json) =>  toast.info(`you deleted ${firstName}`));
}

const handleMessage = async (talentId, userId) => {

}


const TalentCardFollow = ({firstName, lastName, position, img, initials}) => {
  return (
    <div className="card talent flex">
      <div className="circle50 bg-FAV">
        { img ? <img src={img} width="50"/> : <p>{initials}</p> }
      </div>
      <div>
        <p className="c-FAV">{firstName} {lastName}</p>
        <p className="c-A20">{position}</p>
      </div>
      <div className="flex">
        <button className="action" onClick={() => handleMessage(talentId, userId, firstName)}><FiSend /></button>
        <button className="action" onClick={()=> handleDeleteFollow(talentId, userId, firstName)}><RxCross2 /></button>
      </div>
    </div>
  );
};

const TalentCardAdd = ({firstName, lastName, position, img, initials, talentId, userId}) => {
  return (
<div className="card talent flex">
      <div className="circle50 bg-FAV">
        { img ? <img src={img} width="50"/> : <p>{initials}</p> }
      </div>
      <div>
        <p className="c-FAV">{firstName} {lastName}</p>
        <p className="c-A20">{position}</p>
      </div>
      <div className="flex">
        <button className="action" onClick={() => handleMessage(talentId, userId, firstName)}><FiSend /></button>
        <button className="action" onClick={() => handleAddFollow(talentId, userId)}><HiPlus /></button>
      </div>
    </div>
  );
};

export {TalentCardFollow, TalentCardAdd};