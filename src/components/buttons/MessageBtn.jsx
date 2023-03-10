import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";

const handleMessage = async (navigate, talent, user) => {
  await fetch(`${host}/conversations/`, {
    credentials: "include",
    method: "POST",
    body: JSON.stringify({
      userId: user._id,
      receiverId: talent._id,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {

      navigate(`/messages/${json.data._id}`);
    });
};

const SendMessageBtn = ({ talent, user }) => {
  const bg = talent.meta.colorTheme[1];
  const navigate = useNavigate();
  return (
    <button
      className={`action ${bg}`}
      onClick={() => handleMessage(navigate, talent, user)}
    >
      <FiSend />
    </button>
  );
};

export { SendMessageBtn };
