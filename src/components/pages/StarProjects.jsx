import Newsfeed from "../elements/Newsfeed.jsx";
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import { ProjectCardFollow, ProjectFollow } from "../elements/ProjectCard.jsx";
import Footer from "../elements/Footer.jsx";


const StarProjects = () => {
  return (
    <>
      <h1 className="central c-FAV mt1 mb2">star projects</h1>
      
      <ProjectCardFollow/>
      <ProjectFollow/>
      <ProjectFollow/>
      <ProjectCardFollow/>

      <Footer/>
    </>
  );
};

export default StarProjects;