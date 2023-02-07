import { useNavigate } from "react-router-dom";


const RecruiterMenu = () => {
  const navigate = useNavigate()

  return (
    <div className="mt2 mb2">
      <div className="col">
        <button 
          className="bg-FAV" 
          onClick={ ()=> navigate("/newsearch")}>new search
        </button>
        <button 
          className="bg-FAV" 
          onClick={ ()=> navigate("/searchhistory")}>search history
        </button>
        <button 
          className="bg-FAV" 
          onClick={ ()=> navigate("/starprojects")}>star projects
        </button>
        <button 
          className="bg-FAV" 
          onClick={ ()=> navigate("/community")}>star talents
        </button>
      </div>
    </div>
  );
};

export default RecruiterMenu;

