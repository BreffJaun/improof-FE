import Newsfeed from "../elements/Newsfeed.jsx";
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import { MyProjectCard } from "../elements/ProjectCard.jsx";
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
      .then((json) => setUser(json.userData));
    }
    getUser()
    getProjects()
  },[trigger])

  console.log(projects)
  return (
    <>
      <h1 className="central c-FAV mt1 mb2">projects</h1>
      <div>
        <CategoriesFilter/>
      </div>
      <div>
        <h2>STARPROJECTS</h2>
        {user.starProjects.map(project => <MyProjectCard key={project._id} user={user} project={project}/>)}
      </div>
      <div>
        <h2>ALL PROJECTS</h2>
        {projects &&projects.map((project)=> <MyProjectCard key={project._id} user={user} project={project}/>)}
      </div>

      

      <Footer/>
    </>
  );
};

export default StarProjects;