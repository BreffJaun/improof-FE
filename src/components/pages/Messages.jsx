import Footer from "../elements/Footer.jsx";
import { Message, Sender } from "../elements/MessageCard.jsx"
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { host } from "../../api/host.jsx";

//CONTEXT
import UserContext from "../../context/userContext.jsx";

const Messages = () => {
  const {id} = useParams("id")
  const [conversation, setConversation] = useState({})
  const [user, setUser] = useContext(UserContext) 
  const [sender, setSender] = useState({})
  const [participant, setParticipant] = useState(undefined)
  const [msg, setMsg] = useState("")
  const [trigger, setTrigger] = useState(false)
  const [reload, setReload] = useState(false)

  setTimeout(()=> {
    setReload(!reload)
  }, "3000")
  
  useEffect(() => {
    const getConversation = async () => {
      await fetch(`${host}/conversations/${id}`)
        .then((response) => response.json())
        .then((json) => {
          if(json.status){
            setConversation(json.data)
            const other = json.data.participants.find(part => part._id !== user._id)
            setParticipant(other)
          }
        });
    }
    getConversation()
  },[trigger, id, reload])

  useEffect(()=>{
    const getUser = async ()=>{
      await fetch(`${host}/users/${participant._id}`,{
      credentials:"include"
      })
      .then((response) => response.json())
      .then((json) => {
        if(json.status){
          setSender(json.userData)
        }
      })};
      participant && getUser()
  },[conversation])

  const handleMsg = (event)=>{
    setMsg(event.target.value)    
  }

  const handleSendMsg = async () => {
    // from:userId, conversationId:conversation._id
    fetch(`${host}/messages`, {
        method: 'POST',
        body: JSON.stringify({
          conversationId: conversation._id,
          userId: user._id,
          text: msg,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          setTrigger(!trigger)
          setMsg("")
        });
  }

  return ( conversation && sender &&
    <>
      <div className="center">
        <h1 className="c-FAV mt1 mb2">messages</h1>

        <div className="wide col">

          <Sender user={user} sender={sender} />

          {conversation?.message?.map((msg)=> {
            return <Message key={msg._id} user={user} msg={msg}/>
          })}
          <div>
            <input type="text" value={msg} onChange={handleMsg}/>
            <button onClick={handleSendMsg}>send</button>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default Messages;