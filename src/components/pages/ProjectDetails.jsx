import "../../styles/project-details.scss"

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Chrono } from "react-chrono";
import {GiStoneSphere as Stepstone} from "react-icons/gi"
import Footer from "../elements/Footer.jsx";

import {host} from "../../api/host.jsx"

//CONTEXT
import UserContext from "../../context/userContext.jsx";

//ELEMENTS
import { TalentCard } from "../elements/TalentCard.jsx";

const ProjectDetails = () => {
  const {id} = useParams("id")
  const [user, setUser] = useContext(UserContext)
  const [project, setProject] = useState({})
  const [isPending, setPending] = useState(true)
  
  useEffect(() => {
    setPending(true)
    const fetchProject = async () => {
      fetch(`${host}/projects/${id}`,{
        credentials:"include"
      })        
        .then((response) => response.json())
        .then((json) => {
          if(json.status){
            setProject(json.data)
            setPending(false)
          }
        });
    }
    fetchProject()
  },[])
  
  console.log(project)
  const items = !isPending && project.stones.map(stone => {
   return {
    title: stone.date, 
    cardTitle:stone.title, 
    cardSubtitle:stone.description,
    timelineContent:
    <div className="timeline-content">
      {stone?.team?.map(member =>
      <div className=" bg-gDB">
        {member.profile.avatar ? <img src={member.profile.avatar}/> : <p>{member.profile.initials}</p>}
      </div>
       )}
    </div>
  }
  })
  
  return !isPending && user &&( 
    <div className="componente">

      <div>
        {/* <img src="https://www.downloadclipart.net/thumb/9394-stone-1-vector-thumb.png" alt="Thumbnail" /> */}
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </div>
      

     <Chrono 
    //  items={items} 
     className="my-timeline"
     classNames={
      {
        card:"my-card", 
        cardMedia: 'my-card-media',
        cardSubTitle: 'my-card-subtitle',
        cardText: 'my-card-text',
        cardTitle: 'my-card-title',
        controls: 'my-controls',
        title: 'my-title',
        timelineContent:"timeline-content"
      }} >
        
      </Chrono>

      


      <h1>Project Team</h1>
     {
      project.team.map((member) =>  <TalentCard key={member._id} talent={member} user={user}/>)
     }
     <Footer/>
    </div>
  );
};

export default ProjectDetails;