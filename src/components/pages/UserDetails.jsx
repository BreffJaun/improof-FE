import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { host } from "../../api/host.jsx";


import UserContext from "../../context/userContext.jsx";


//BUTTONS
import {FollowBtn} from "../buttons/FollowBtn.jsx"
import { SendMessageBtn } from "../buttons/MessageBtn.jsx";


//ELEMENTS
import { MyProjectCard } from "../elements/ProjectCard.jsx";
import { TalentCard } from "../elements/TalentCard.jsx";
import Up from "../elements/Up.jsx";
import Footer from "../elements/Footer.jsx";


const UserDetails = () => {
  const {id} = useParams("id")
  const [user, setUser] = useContext(UserContext)
  const [talent, setTalent] = useState(undefined)
  const [isPending, setIsPending] = useState(true)


  const [showContact, setShowContact] = useState(false)


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
  },[id])

  return !isPending && user &&
    <>
    <div className="bo-DARK"></div>
    <div className="central col">

      <div className="circle70 bg-FAV central">
        {talent.profile.avatar ? <img src="" alt="" /> :
          <div className="initials"><p>{talent.profile.initials}</p></div>
        }
      </div>
        <h1 className="c-FAV mt05">{talent.profile.firstName} {talent.profile.lastName}</h1>
      <p className="mt05">{talent.profile.description ? talent.profile.description : "Tell us something about you!"}</p>


      <button className="bg-FAV mt1">read more</button>


      <div className="flex">
        <div>
          {user?._id !== talent._id && <FollowBtn talent={talent} user={user} /> } 
        </div>
        <div>
          {user._id !== talent._id && <SendMessageBtn talent={talent} user={user} /> }
        </div>
      </div>
    </div>
    <div className="bo-DARK"></div>
    <div className="central col">
      <h1 className="c-FAV">my projects</h1>
      <p className="c-FAV mb2">({talent.myProjects.length})</p>
        {talent.myProjects.length ? 
        talent.myProjects.map(project => <MyProjectCard key={project._id} project={project} user={user} />) : 
        <p>It is time to start your first project.</p>}
    </div>
    
    <div className="bo-DARK"></div>
    <div>
      <h1 className="central c-FAV">i follow</h1>
      <p className="central c-FAV mb2">({talent.follows.length})</p>
        {talent.follows.length ? 
        talent.follows.map(follow => <TalentCard key={follow._id} talent={follow} user={user}/> ):
        <p>You´re not following anybody!
      </p>}
    </div>
    <div className="bo-DARK"></div>
    <div className="central col">
      <h1 className="c-FAV mb1">contact</h1>
      {showContact ?
        <div className="col mb1">
          {user.contact.mobile &&
            <div className="mb1">
              <p>mobile:</p>
              <p>{user.contact.mobile}</p>
            </div>
          }
          {user.contact.website &&
            <div className="mb1">
              <p>website:</p>
              <p>{user.contact.website}</p>
            </div>
          }
          {user.contact.online1 &&
            <div className="mb1">
              <p>Online-Profil:</p>
              <p>{user.contact.online1}</p>
            </div>
          }
          {user.contact.online2 &&
            <div className="mb1">
              <p>Online-Profil:</p>
              <p>{user.contact.online2}</p>
            </div>
          }
          {user.contact.online3 &&
            <div className="mb1">
              <p>Online-Profil:</p>
              <p>{user.contact.online3}</p>
            </div>
          }
        </div> : ""}


      <button className="bg-FAV" onClick={() => setShowContact(!showContact)}>{showContact ? "close" : "click here"}</button>


    </div>
    <Footer />
    <ToastContainer/>
  </> 
};


export default UserDetails;