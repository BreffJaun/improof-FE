import { useNavigate } from "react-router-dom";



const TalentMenu = () => {

  const navigate = useNavigate()


  return (
    <div className="componente">
      <h1>componente RecruiterMenu</h1>
      <p onClick={ ()=> navigate("/createproject")}>new project</p>
      <p onClick={ ()=> navigate("/myprojects")}>my projects</p>
      <p onClick={ ()=> navigate("/starprojects")}>star projects</p>
      <p onClick={ ()=> navigate("/community")}>community</p>
    </div>
  );
};

export default TalentMenu;