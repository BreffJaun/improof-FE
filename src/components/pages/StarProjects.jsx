import Footer from "../elements/Footer.jsx";
import Newsfeed from "../elements/Newsfeed.jsx";
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import { ProjectCardFollow, ProjectFollow } from "../elements/ProjectCard.jsx";



const StarProjects = () => {
  return (
    <>
      <div className="bo-DARK"></div>
      <h1 className="central c-FAV mb2">star projects</h1>
      
      <ProjectCardFollow/>
      <ProjectFollow/>
      <ProjectFollow/>
      <ProjectCardFollow/>

      <Footer/>
    </>
  );
};

export default StarProjects;