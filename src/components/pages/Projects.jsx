import Newsfeed from "../elements/Newsfeed.jsx";
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import { MyProjectCard, ProjectCardNewsFeed } from "../elements/ProjectCard.jsx";
import Footer from "../elements/Footer.jsx";

import { host } from "../../api/host.jsx";
import { useContext, useState, useEffect } from "react";

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
      <h1 className="central c-FAV mt1 mb2">projects</h1>
      <div>
        <CategoriesFilter setCategory={setCategory}/>
      </div>
      <div>
        <h2>STARPROJECTS</h2>
        { category ? 
        user?.starProjects.map(project => project.category === category && <ProjectCardNewsFeed key={project._id} user={user} project={project}/>) 
        :
        user?.starProjects.map(project => <ProjectCardNewsFeed key={project._id} user={user} project={project}/>)
        }
      </div>
      <div>
        <h2>ALL PROJECTS</h2>
        {category ? 
        projects.map(project => project.category === category && <ProjectCardNewsFeed key={project._id} user={user} project={project}/>)
        :
        projects &&projects.map((project)=> {
           const alreadyFollowing = user.starProjects.find(starProject => starProject._id === project._id)           
           return !alreadyFollowing && <ProjectCardNewsFeed key={project._id} user={user} project={project}/>         

        })
        }
         
      </div>

      

      <Footer/>
    </>
  );
};

export default StarProjects;