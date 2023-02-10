import { useContext } from "react";

// ICONS
import { MdOutlineClose as X} from "react-icons/md"

//CONTEXT 
import UserContext from "../../context/userContext.jsx";


const Notifications = ({setShowNotifications, showNotifications}) => {
  const [user, setUser] = useContext(UserContext)

  return (
    <>
      <div className="burger-container rel">
        <div className="col">
          {user.notifications.map(notification => {     
            const date1 = notification.createdAt.toString().split("T")
            const date = date1[0].split("-").reverse().join(".")
            const time = date1[1].slice(0,5)            
            return <div className="mb1" key ={notification._id}>
              <p className={notification.isRead ? "c-FAV": "bg-gGR1"}>{notification.notText}</p>
              <p>{date + "   " +  time}</p></div>}).reverse()}
          <div className="central" onClick={()=>setShowNotifications(false)}>
            <button className="circle40 bg-FAV central BrgClsBtn" title="close">
              <h1><X /></h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;