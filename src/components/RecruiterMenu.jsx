import { useNavigate } from "react-router-dom";



const RecruiterMenu = () => {
  const navigate = useNavigate()

  return (
    <div className="mt2 mb2">
      <div className="col">
        <button 
          className="bg-FAV btn" 
          onClick={ ()=> navigate("/community")}>find talents
        </button>
        <button 
          className="bg-FAV" 
          onClick={ ()=> navigate("/starprojects")}>find projects
        </button>
        <button 
          className="bg-FAV" 
          onClick={ ()=> navigate("/newsearch")}>new search
        </button>
        <button 
          className="bg-FAV" 
          onClick={ ()=> navigate("/searchhistory")}>search history
        </button>

      </div>
    </div>
  );
};

export default RecruiterMenu;

