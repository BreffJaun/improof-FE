import { useNavigate } from "react-router-dom";

const ReceiveMessage = () => {
  return (
    <div className="mb1 left">
      <p className="c-FAV">this is just a testmessage</p>
      <p>09.02.2023 15:02</p>
    </div>
  );
};

const Message = ({ msg, user }) => {
  const date1 = msg.createdAt.toString().split("T");
  const date = date1[0].split("-").reverse().join(".");
  const time1 = parseInt(date1[1].slice(0, 2)) + 1;
  const time2 = date1[1].slice(2, 5);
  const time = time1 + time2;
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];

  return (
    <div className={msg.from === user._id ? "mb1 mgright" : "mb1 mgleft"}>
      <p className={color}>{msg.text}</p>
      <p>
        {date} {time}
      </p>
    </div>
  );
};

const Sender = ({ sender }) => {
  const navigate = useNavigate();
  const bg = sender?.meta?.colorTheme[1];
  return (
    <div className="mb2" onClick={() => navigate(`/userdetails/${sender._id}`)}>
      <div className="flex ai">
        <div className={`circle80 ${bg} central conversation-icon`}>
          {sender?.profile?.avatar ? (
            <img src={sender.profile?.avatar} />
          ) : (
            <p className="initials central">{sender.profile?.initials}</p>
          )}
        </div>
        <div className="col">
          <p>{sender.profile?.firstName}</p>
          <p className="c-A80">
            {sender.profile?.isRecruiter ? "recruiter" : "talent"}
          </p>
        </div>
      </div>
    </div>
  );
};

export { ReceiveMessage, Message, Sender };
