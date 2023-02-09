import { useContext } from "react";

//ELEMENTS
import Footer from "../elements/Footer.jsx";

//CONTEXT 
import UserContext from "../../context/userContext.jsx";

const Notifications = () => {
  const [user, setUser] = useContext(UserContext)

  return (
    <>
      <div className="central col">
        <h1 className="c-FAV mt2 mb2">notifications</h1>
        <div className="col">
          {user.notifications.map(notification => {     
              const date1 = notification.createdAt.toString().split("T")
              const date = date1[0].split("-").reverse().join(".")
              const time = date1[1].slice(0,5)            
              return <div className="mb1" key ={notification._id}>
                <p className={notification.isRead ? "c-FAV": "bg-gGR1"}>{notification.notText}</p>
                <p>{date + " " +  time}</p>
            </div>}).reverse()}          
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Notifications;