import { useContext } from "react";

// ICONS
import { MdOutlineClose as X } from "react-icons/md";
import { GoPrimitiveDot } from "react-icons/go";

//CONTEXT
import UserContext from "../../context/userContext.jsx";

const Notifications = ({ setShowNotifications }) => {
  const [user, setUser] = useContext(UserContext);
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const mode = user.meta.darkMode;

  return (
    <>
      <div className="burger-container rel">
        <div className="col" id={mode && "bgG"}>
          <p className="mb2 info center">notifications</p>
          <div className="scroll-container">
            <div className="col mr1">
              {user.notifications
                .map((notification) => {
                  const date1 = notification.createdAt.toString().split("T");
                  const date = date1[0].split("-").reverse().join(".");
                  const time1 = parseInt(date1[1].slice(0, 2)) + 1;
                  const time2 = date1[1].slice(2, 5);
                  const time = time1 + time2;

                  return (
                    <div className="mb1" key={notification._id}>
                      <p
                        // className={notification.isRead ? { color } : "bg-gGR1"}
                        className={color}
                      >
                        {notification.notText}
                      </p>
                      <p className="rel">
                        <span className="fw700">{time}</span> - {date}
                        {!notification.isRead && (
                          // <div className={`dot abs circle15 bg-gO`}></div>
                          <div >
                            <GoPrimitiveDot className={`red-dot`}/>
                          </div>
                        )}
                      </p>
                    </div>
                  );
                })
                .reverse()}
              <div
                className="central"
                onClick={() => setShowNotifications(false)}
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

export default Notifications;
