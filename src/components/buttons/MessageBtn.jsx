import {FiSend} from "react-icons/fi"

const handleMessage = async (talent, user) => {}

  const SendMessageBtn = ({talent, user}) => {
  return (
    <button className="action" onClick={() => handleMessage(talent, user)}><FiSend /></button>
  )
}

export {SendMessageBtn}