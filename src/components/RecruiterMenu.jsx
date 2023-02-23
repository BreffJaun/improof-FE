import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext.jsx";

const RecruiterMenu = () => {
  const [user, setUser] = useContext(UserContext);
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const navigate = useNavigate();

  return (
    <div className="mt2 mb2">
      {/* <div> */}
      <button className={bg} onClick={() => navigate("/community")}>
        find talents
      </button>
      <button className={bg} onClick={() => navigate("/starprojects")}>
        find projects
      </button>
      <button className={bg} onClick={() => navigate("/newsearch")}>
        new search
      </button>
    </div>
    // </div>
  );
};

export default RecruiterMenu;
