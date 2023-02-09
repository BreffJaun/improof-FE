import { MyProjectCard, ProjectCardNewsFeed } from "../elements/ProjectCard.jsx";
import { useContext, useEffect } from "react";
import { host } from "../../api/host.jsx";
import Footer from "../elements/Footer.jsx";

import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";


const MyProjects = () => {
  const [user, setUser] = useContext(UserContext)
  const [trigger, setTrigger] = useContext(TriggerContext)
  
  useEffect(()=>{
    const getUser = async () => {
      await fetch(`${host}/users/${user._id}`,{
        credentials:"include"
      })
      .then((response) => response.json())
      .then((json) => setUser(json.userData));
    }
    getUser()
  },[trigger])

  return (
    <div className="mb2 mt2">
      <h1 className="central c-FAV mb2">my projects</h1>
      {user?.myProjects?.map((project)=> <ProjectCardNewsFeed project={project} user={user} />)}
      <Footer/>
    </div>
  );
};

export default MyProjects;