import { useNavigate } from "react-router-dom";


const RecruiterMenu = () => {
  const navigate = useNavigate()

  return (

    
    <div>
      <h2>recruiter-meu</h2>
      <p onClick={ ()=> navigate("/newsearch")}>new search</p>
      <p onClick={ ()=> navigate("/searchhistory")}>search history</p>
      <p onClick={ ()=> navigate("/starprojects")}>star projects</p>
      <p onClick={ ()=> navigate("/community")}>star talents</p>
    </div>



  );
};

export default RecruiterMenu;

