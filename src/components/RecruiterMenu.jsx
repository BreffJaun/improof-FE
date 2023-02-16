import { useNavigate } from "react-router-dom";



const RecruiterMenu = () => {
  const navigate = useNavigate()

  return (
    <div className="mt2 mb2">
      <div>
        <button 
          onClick={ ()=> navigate("/community")}>find talents
        </button>
        <button 
          onClick={ ()=> navigate("/starprojects")}>find projects
        </button>
        <button 
          onClick={ ()=> navigate("/newsearch")}>new search
        </button>
      </div>
    </div>
  );
};

export default RecruiterMenu;

