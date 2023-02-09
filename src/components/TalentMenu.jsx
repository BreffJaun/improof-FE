import { useNavigate } from "react-router-dom";



const TalentMenu = () => {

  const navigate = useNavigate()

  return (
    <div className="mt2 mb2">
      <div className="col">
        <button
          onClick={ ()=> navigate("/createproject")}>new project
        </button>
        <button
          onClick={ ()=> navigate("/myprojects")}>my projects
        </button>
        <button
          onClick={ ()=> navigate("/projects")}>projects
        </button>
        <button
          onClick={ ()=> navigate("/community")}>community
        </button>
      </div>
    </div>
  );
};

export default TalentMenu;