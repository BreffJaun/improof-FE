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
          {user.notifications.map(notification => 
            <div className="mb1">
                <p className="c-FAV">{notification.notText}</p>
                <p>{notification.createdAt}</p>
            </div>).reverse()}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Notifications;