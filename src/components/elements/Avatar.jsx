import { useContext } from "react";
import UserContext from "../../context/userContext.jsx";


const AvatarL = () => {
  const [user, setUser] = useContext(UserContext)

  return (
    <div className="central">
      {!user?.profile?.avatar ? 
        <div className="circle80 bg-FAV central initials">
          {user?.profile?.initials}
        </div> :
      <div className="circle70 bg-FAV">{user?.profile?.img}</div>
      }
    </div>
  );
};

export default AvatarL;