import { useNavigate } from "react-router-dom";



const TalentMenu = () => {

  const navigate = useNavigate()

  return (
    <div className="z mt2 mb2">
      <div className="col">
        <button
          className="bg-FAV" 
          onClick={ ()=> navigate("/createproject")}>new project
        </button>
        <button
          className="bg-FAV" 
          onClick={ ()=> navigate("/myprojects")}>my projects
        </button>
        <button
          className="bg-FAV" 
          onClick={ ()=> navigate("/starprojects")}>star projects
        </button>
        <button
          className="bg-FAV" 
          onClick={ ()=> navigate("/community")}>community
        </button>
      </div>
    </div>
  );
};

export default TalentMenu;