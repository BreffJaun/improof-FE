import { MyProjectCard } from "../elements/ProjectCard.jsx";
import { useContext } from "react";
import Footer from "../elements/Footer.jsx";

import UserContext from "../../context/userContext.jsx";

const MyProjects = () => {
  const [user, setUser] = useContext()
  return (
    <div className="mb2 mt2">
      <h1 className="central c-FAV mb2">my projects</h1>
      <MyProjectCard />

      <Footer/>
    </div>
  );
};

export default MyProjects;