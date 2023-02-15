import Newsfeed from "../elements/Newsfeed.jsx";
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import { MyProjectCard, ProjectCardNewsFeed, ProjectCard } from "../elements/ProjectCard.jsx";
import Footer from "../elements/Footer.jsx";

import { host } from "../../api/host.jsx";
import { useContext, useState, useEffect } from "react";

// STYLES
import "../../styles/projects.scss"

// CONTEXT 
import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";

const StarProjects = () => {  
  const [user, setUser] = useContext(UserContext)
  const [trigger, setTrigger] = useContext(TriggerContext)
  const [projects, setProjects] = useState([])
  const [pending, setPending] = useState(true)
  const [category, setCategory] = useState("")

  useEffect(()=> {
    const getProjects = async () => {
      await fetch(`${host}/projects`)
      .then((response) => response.json())
      .then((json) => setProjects(json));
    }

    const getUser = async () => {
      await fetch(`${host}/users/${user._id}`,{
        credentials:"include"
      })
      .then((response) => response.json())
      .then((json) => {
        setUser(json.userData)
        setPending(false)
      });
    }

    getUser()
    getProjects()

  },[trigger])

  console.log(category)
  return ( !pending &&
    <>
      <h3 className="central c-FAV mt1 mb2">projects</h3>
      <div className="central">
        <CategoriesFilter setCategory={setCategory}/>
      </div>

      <h1 className="center c-FAV mt2 mb2">your star projects</h1>
      <div className="projects-container">
        { category ? 
        user?.starProjects.map(project => project.category === category &&
          <ProjectCard key={project._id} user={user} project={project} />) 
        :
        user?.starProjects.map(project => <ProjectCard key={project._id} user={user} project={project}/>)
        }
      </div>
    
      <h1 className="center c-FAV mt2 mb2">all the other projects</h1>
      <div  className="projects-container">
        {category ? 
        projects.map(project => project.category === category && <ProjectCard key={project._id} user={user} project={project}/>)
        :
        projects &&projects.map((project)=> {
          const alreadyFollowing = user.starProjects.find(starProject => starProject._id === project._id)           
          return !alreadyFollowing && <ProjectCard key={project._id} user={user} project={project}/>         
        })
        }
      </div>
      <Footer/>
    </>
  );
};

export default StarProjects;