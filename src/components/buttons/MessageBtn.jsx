import {FiSend} from "react-icons/fi"
import { useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";

const handleMessage = async (navigate, talent, user) => {
  await fetch(`${host}/conversations/`, {
  credentials:"include",
  method: 'POST',
  body: JSON.stringify({
    userId: user._id,
    receiverId: talent._id,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json.data._id)
    navigate(`/messages/${json.data._id}`)
  } );
}

  const SendMessageBtn = ({talent, user}) => {
    const navigate = useNavigate()
  return (
    <button className="action" onClick={() => handleMessage(navigate, talent, user)}><FiSend /></button>
  )
}

export {SendMessageBtn}