import "../../styles/project-details.scss"
import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { Chrono } from "react-chrono";
import {GiStoneSphere as Stepstone} from "react-icons/gi"
import Footer from "../elements/Footer.jsx";

import {host} from "../../api/host.jsx"

//CONTEXT
import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";


// STYLE
import "../../styles/chrono.scss"
//ELEMENTS
import { TalentCard } from "../elements/TalentCard.jsx";

const ProjectDetails = () => {
  const {id} = useParams("id")
  const [user, setUser] = useContext(UserContext)
  const [trigger, setTrigger] = useContext(TriggerContext)
  const [project, setProject] = useState({})
  const [isPending, setPending] = useState(true)
  // const icons = !isPending && user && document.querySelector("#icons")
  const icons2 = useRef(null)

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

  useEffect(()=> {

    const getUser = async () => {
      await fetch(`${host}/users/checklogin`,{
        credentials:"include"
        })
        .then((response) => response.json())
        .then((json) => {
          if(json.status){
            setUser(json.user)
          }else{
            navigate("/login")
          }      
      })
    }
    getUser();
  },[trigger])

  return !isPending && user &&( 
    <div className="componente">

      <div>
        <img src="https://www.downloadclipart.net/thumb/9394-stone-1-vector-thumb.png" alt="Thumbnail" />
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </div>
      

     <Chrono>

        {
        !isPending && project.stones.map(stone =>{
          return (
     
              <div>
                {stone.media && <img src="" alt="" />}
                <h1>{stone.title}</h1>
                <p>{stone.kind}</p>
                <p>{stone.description}</p>
                <div className="mt1 flex g05">
                    {stone?.team?.map(member =>
                      <div className="circle50 bg-FAV central">
                        {member.profile.avatar ? <img src={member.profile.avatar}/> : <p className="c-A100">{member.profile.initials}</p>}
                      </div>
                    )}
                </div>
              </div>     
       
          )
        })        
        }                
        <div className="chrono-icons" id="icons" ref={icons2}>
          
        </div>

    
    
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