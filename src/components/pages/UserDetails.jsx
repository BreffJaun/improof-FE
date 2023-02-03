import "../../styles/elements.scss"
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { ToastContainer} from "react-toastify";

import UserContext from "../../context/userContext.jsx";
import { host } from "../../api/host.jsx";

//BUTTONS
import {FollowAddBtn} from "../buttons/FollowBtn.jsx"
import { SendMessageBtn } from "../buttons/MessageBtn.jsx";

//ELEMENTS
import { MyProjectCard } from "../elements/ProjectCard.jsx";
import { TalentCardFollow } from "../elements/TalentCard.jsx";

const UserDetails = () => {
  const {id} = useParams("id")
  const [user, setUser] = useContext(UserContext)
  const [talent, setTalent] = useState(undefined)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {

    const getUser = ()=>{
      fetch(`${host}/users/${id}`,{
      credentials:"include"
      })
      .then((response) => response.json())
      .then((json) => {
        if(json.status){
          setTalent(json.userData)
          setIsPending(false)
        }
      })};
    getUser()
  },[])
console.log(user);
  return !isPending && user &&
    <div>
      <div className="circle70 bg-FAV">
        {talent.profile.avatar ? <img src="" alt="" /> : <p>{talent.profile.initials}</p>}
      </div>
      <div className="c-FAV">
        <h2>{talent.profile.firstName} {talent.profile.lastName}</h2>
        <p>{talent.profile.description ? talent.profile.description : "no description"}</p>
      </div>
      <div className="flex">
        <div>
          {user?._id !== talent._id && <FollowAddBtn talentId={talent._id} userId={user._id} firstName={talent.profile.firstName}/> }
          <p>follow</p>  
        </div>
        <div>
          {user._id !== talent._id && <SendMessageBtn talentId={talent._id} userId={user._id} firstName={talent.profile.firstName}/> }
          <p>message</p>
        </div>
      </div>
      <div>
        <h1>MY PROJECTS ({talent.myProjects.length})</h1>
        {talent.myProjects.length ? 
        talent.myProjects.map(project => <MyProjectCard key={project._id} project={project} userId={user._id}/>) : 
        <p>Its Time to start your first project.</p>}
      </div>
      <div>
        <h1>MY COMMUNITY ({talent.follows.length})</h1>
        {talent.follows.length ? 
        talent.follows.map(follow => <TalentCardFollow key={follow._id} follower={follow} userId={user._id}/> ):
        <p>You´re not following anybody</p>}
      </div>
      <div>
        {user._id !== talent._id && 
        <>
        <h1>contact</h1>
        <p>brauchen wir das?</p>
        </>}
      </div>    

          <ToastContainer/>
    </div> 
    
};


export default UserDetails;