import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext.jsx";

const TalentMenu = () => {
  const [user, setUser] = useContext(UserContext)
  const color = user.meta.colorTheme[0]
  const bg = user.meta.colorTheme[1]
  const navigate = useNavigate()

  return (
    <div className="mt2 mb2">
      <div className="col">
        <button className={bg}
          onClick={ ()=> navigate("/createproject")}>new project
        </button>
        <button className={bg}
          onClick={ ()=> navigate("/myprojects")}>my projects
        </button>
        <button className={bg}
          onClick={ ()=> navigate("/projects")}>projects
        </button>
        <button className={bg}
          onClick={ ()=> navigate("/community")}>community
        </button>
      </div>
    </div>
  );
};

export default TalentMenu;