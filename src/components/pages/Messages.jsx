import Footer from "../elements/Footer.jsx";
import { Message, Sender } from "../elements/MessageCard.jsx";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState, useRef } from "react";
import { host } from "../../api/host.jsx";


//CONTEXT
import UserContext from "../../context/userContext.jsx";

const Messages = () => {
  const { id } = useParams("id");
  const [conversation, setConversation] = useState({});
  const [user, setUser] = useContext(UserContext);
  const [sender, setSender] = useState({});
  const [participant, setParticipant] = useState(undefined);
  const [msg, setMsg] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [reload, setReload] = useState(false);
  const scrollBottom = useRef(null)
  const color = user.meta.colorTheme[0];

  const scrollToBottom = () => {
    scrollBottom.current?.scrollIntoView({ behavior: "smooth" })
  }

  setTimeout(() => {
    setReload(!reload);
  }, "3000");

  useEffect(() => {
    const getConversation = async () => {
      await fetch(`${host}/conversations/${id}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setConversation(json.data);
            const other = json.data.participants.find(
              (part) => part._id !== user._id
            );
            setParticipant(other);
          }
        });
    };
    getConversation();
  }, [reload]);

  useEffect(() => {
    const getConversation = async () => {
      await fetch(`${host}/conversations/${id}`)
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setConversation(json.data);
            const other = json.data.participants.find(
              (part) => part._id !== user._id
            );
            setParticipant(other);
            scrollToBottom()
          }
        });
    };
    getConversation();
  }, [id, trigger]);

  useEffect(() => {
    const getUser = async () => {
      await fetch(`${host}/users/${participant._id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setSender(json.userData);
          }
        });
    };
    participant && getUser();
  }, [conversation]);

  const handleMsg = (event) => {
    setMsg(event.target.value);
  };

  const handleSendMsg = async (event) => {
    event.preventDefault()
    // from:userId, conversationId:conversation._id
    fetch(`${host}/messages`, {
      method: "POST",
      body: JSON.stringify({
        conversationId: conversation._id,
        userId: user._id,
        text: msg,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setTrigger(!trigger);
        setMsg("");
      });
  };
  const bg = user.meta.colorTheme[1];

  return (
    conversation &&
    sender && (
      <div className="center">
        <div className="w90d">
          <h1 className={`${color} mb1`}>messages</h1>
          <div className="center">
            <Sender user={user} sender={sender} />
          </div>
        </div>

        <div className="w90d">
          <div className="col mb2">
            <div className="message-container">
              <div className="col mr2">
                {conversation?.message?.map((msg) => {
                  return <Message key={msg._id} user={user} msg={msg} />
                })}
              </div>
              <div ref={scrollBottom} />
            </div>
          </div>
        </div>

        <div className="w90d">
          <form onSubmit={(event)=>handleSendMsg(event)}>
            <input
              type="text"
              value={msg}
              onChange={handleMsg}
              autoFocus
              className="shadow-s max mb1"
            />
            <button className={bg} type="submit">send</button>
          </form>
        </div>
      </div>
    )
  );
};

export default Messages;
