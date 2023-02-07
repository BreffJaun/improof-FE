import { useContext } from "react";

//ELEMENTS
import Footer from "../elements/Footer.jsx";

//CONTEXT 
import UserContext from "../../context/userContext.jsx";

const Notifications = () => {
  const [user, setUser] = useContext(UserContext)

  return (
    <>
      <div className="bo-DARK"></div>
      <div className="c-FAV mb2">
        <h1>notifications</h1>
        <div className="col">
           {user.notifications.map(notification => 
            <div className="componente">
              <p>{notification.notText}</p>
            </div>)}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Notifications;