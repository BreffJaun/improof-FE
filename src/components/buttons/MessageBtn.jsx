import {FiSend} from "react-icons/fi"

const handleMessage = async (talentId, userId, firstName) => {}

  const SendMessageBtn = () => {
  return (
    <button className="action" onClick={() => handleMessage(talentId, userId, firstName)}><FiSend /></button>
  )
}

export {SendMessageBtn}