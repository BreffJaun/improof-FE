import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";

//ELEMENTS

// ICONS
import { MdOutlineClose as X} from "react-icons/md"

const Conversations = ({setShowConversations, showConversations, user, unreadMsgs}) => {
  const setMsgRead = (id) => {
    fetch(`${host}/messages`, {
      method: 'PATCH',
      body: JSON.stringify({
        userId: user._id,
        conversationId:id
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log("FETCH IN CONVERSATION",json));
  }
  const navigate = useNavigate()

  return (
    <>
      <div className="burger-container rel">
        <div className="col">
          <h1>these are your conversations</h1>

          {user?.conversations?.map(con => { 
            const unread = con.message.find(msg => !msg.isRead && msg.from !== user._id)
            const date1 = con.message[0].createdAt.toString().split("T")
            const date = date1[0].split("-").reverse().join(".")
            const time = date1[1].slice(0,5)            
            const participant = con.participants.find(part => part._id !== user._id)
            return <div className={unread && "bg-FAV"} key ={con._id} onClick={()=>{
              navigate(`/messages/${con._id}`)
              setShowConversations(!showConversations)
              setMsgRead(con._id)
              }}>
                      <p className="c-FAV">{participant.profile.firstName} {participant.profile.lastName}</p>
                      <p> {time} {date} </p>
                  </div>
                }).reverse()
            }        

            
              <div className="central" onClick={()=>setShowConversations(!showConversations)}>
              <button className="circle40 bg-FAV central BrgClsBtn" title="close">
                <h1><X /></h1>
              </button>
            </div>

        </div>
      </div>
    </>
  );
};

export default Conversations;