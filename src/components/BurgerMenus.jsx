import { useNavigate } from "react-router-dom";


const BurgerMenuTalent = () => {
  const navigate = useNavigate()

  return (
    <div>
      TALENT-Navbar
      <div>
        lightmode/darkmode
        <p onClick={ ()=> navigate("/")}>my profile</p>
      </div>
      <div>
        <p onClick={ ()=> navigate("/createproject")}>new project</p>
        <p onClick={ ()=> navigate("/myprojects")}>my projects</p>
        <p onClick={ ()=> navigate("/starprojects")}>star projects</p>
        <p onClick={ ()=> navigate("/community")}>community</p>
      </div>
      <div>
        <p onClick={ ()=> navigate("/login")}>logout</p>
      </div>
    </div>
  );
};




const BurgerMenuRecruiter = () => {
  return (
    <div>
      TALENT-Navbar
      <div>
        lightmode/darkmode
        <p onClick={ ()=> navigate("/")}>my profile</p>
      </div>
      <div>
        <p onClick={ ()=> navigate("/community")}>show all talents</p>
        <p onClick={ ()=> navigate("/")}>star talents</p>
        <p onClick={ ()=> navigate("/")}>star projects</p>
        <p onClick={ ()=> navigate("/")}>search history</p>
      </div>
      <div>
        <p onClick={ ()=> navigate("/")}>logout</p>
      </div>
    </div>
  );
};

export {BurgerMenuTalent, BurgerMenuRecruiter};