import {FiSend} from "react-icons/fi"

const handleMessage = async (talentId, userId, firstName) => {}

  const SendMessageBtn = ({talentId, userId, firstName}) => {
  return (
    <button className="action" onClick={() => handleMessage(talentId, userId, firstName)}><FiSend /></button>
  )
}

export {SendMessageBtn}