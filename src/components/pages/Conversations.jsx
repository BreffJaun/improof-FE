import { useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";

//ELEMENTS

// ICONS
import { MdOutlineClose as X } from "react-icons/md";

const Conversations = ({
  setShowConversations,
  showConversations,
  user,
  unreadMsgs,
}) => {
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const mode = user.meta.darkMode;

  const setMsgRead = (id) => {
    fetch(`${host}/messages`, {
      method: "PATCH",
      body: JSON.stringify({
        userId: user._id,
        conversationId: id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  };
  const navigate = useNavigate();

  return (
    <>
      <div className="burger-container rel">
        <div className="col" id={mode && "bgG"}>
          <p className="mb2 info center">conversations</p>
          <div className="scroll-container">
            <div className="col mr1">
              {user?.conversations
                ?.map((con) => {
                  const unread = con.message.find(
                    (msg) => !msg.isRead && msg.from !== user._id
                  );
                  const date1 = con?.message[con?.message.length -1]?.createdAt
                    ?.toString()
                    .split("T");
                  const date = date1 && date1[0].split("-").reverse().join(".");
                  const time1 = date1 && parseInt(date1[1].slice(0, 2)) + 1;
                  const time2 = date1 && date1[1].slice(2, 5);
                  const time = time1 + time2;
                  const participant = con.participants.find(
                    (part) => part._id !== user._id
                  );

                  return (
                    participant && (
                      <div
                        // className={unread && "bg-FAV"}
                        key={con._id}
                        onClick={() => {
                          navigate(`/messages/${con._id}`);
                          setShowConversations(!showConversations);
                          setMsgRead(con._id);
                        }}
                      >
                        <div className="flex ai mb1">
                          <div className="circle60 bg-FAV central conversation-icon">
                            {participant?.profile?.avatar ? (
                              <img src={participant.profile?.avatar} />
                            ) : (
                              <p className="initials central">
                                {participant.profile?.initials}
                              </p>
                            )}
                          </div>
                          <div className="rel col">
                            <p className={color}>
                              {participant.profile.firstName}{" "}
                              {participant.profile.lastName}
                            </p>
                            <p>
                              <span className="fw700">{time  ? time : ""}</span> -{" "}
                              {date && date}
                            </p>
                              {unread && (
                                <div className={`dot abs circle15 ${bg}`}></div>
                              )}
                          </div>
                        </div>
                      </div>
                    )
                  );
                })}
              <div
                className="central"
                onClick={() => setShowConversations(!showConversations)}
              >
                <button
                  className={`circle40 ${bg} central BrgClsBtn`}
                  title="close"
                >
                  <X />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversations;
