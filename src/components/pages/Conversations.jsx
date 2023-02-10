import { useContext } from "react";

//ELEMENTS

// ICONS
import { MdOutlineClose as X} from "react-icons/md"

//CONTEXT 
import UserContext from "../../context/userContext.jsx";

const Conversations = ({setShowConversations, showConversations}) => {
  const [user, setUser] = useContext(UserContext)

  return (
    <>
      <div className="burger-container rel">
        <h1>these are your conversations</h1>
        <div className="central" onClick={()=>setShowConversations(!showConversations)}>
          <button className="circle40 bg-FAV central BrgClsBtn" title="close">
            <h1><X /></h1>
          </button>
        </div>
      </div>
    </>
  );
};

export default Conversations;