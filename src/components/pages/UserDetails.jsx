import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { host } from "../../api/host.jsx";


import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";

//BUTTONS
import { FollowBtn } from "../buttons/FollowBtn.jsx"
import { SendMessageBtn } from "../buttons/MessageBtn.jsx";
import { MdEdit } from "react-icons/md"

//ELEMENTS
import { MyProjectCard } from "../elements/ProjectCard.jsx";
import { TalentCard } from "../elements/TalentCard.jsx";
import Up from "../elements/Up.jsx";
import Footer from "../elements/Footer.jsx";
import UserEdit from "./UserEdit.jsx";


const UserDetails = () => {
  const navigate = useNavigate()

  const {id} = useParams("id")
  const [user, setUser] = useContext(UserContext)
  const [trigger, setTrigger] = useContext(TriggerContext)
  const [talent, setTalent] = useState(undefined)
  const [isPending, setIsPending] = useState(true)

  const [showContact, setShowContact] = useState(false)
  const [showInfos, setShowInfos] = useState(false)

  useEffect(() => {
    setIsPending(true)
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

  useEffect(()=> {
    setIsPending(true)
    const getUser = async () => {
      await fetch(`${host}/users/checklogin`,{
        credentials:"include"
        })
        .then((response) => response.json())
        .then((json) => {
          setIsPending(false)
          if(json.status){
            setUser(json.user)
            setIsPending(false)
          }else{
            navigate("/login")
          }      
      })
    }
    getUser()
;
  },[trigger])


  return talent &&( 
    <>
    <div className="central col mt3">

      <div className="rel">
        <div className="circle90 bg-FAV central">
          {talent.profile.avatar ? <img src="" alt="" /> :
            <div className="initials"><p>{talent.profile.initials}</p></div>
          }
        </div>
        {user._id === talent._id ?
          <div
            className="circle40 bg-FAV central editBtn"
            onClick={() => navigate(`/useredit/${user._id}`)}>
            <p className="c-A100">edit
            </p>
          </div>
          : ""
        }
      </div>

        <div className="col">
          <div>user id: {user._id}</div>
          <div>talent id:{talent._id}</div>
        </div>

        <h1 className="central c-FAV mt05">{talent.profile.firstName} {talent.profile.lastName}</h1>
        <p className="mt05 mb1">{talent.profile.description ? talent.profile.description : "You could add some info to your profile."}</p>
        {showInfos ?
          <div className="col mb1">
            {/* ----------------------------------------------- */}
            {talent.profile.position &&
              <div className="mb1">
                <p className="c-FAV">my current position</p>
                <p>{talent.profile.position}</p>
              </div>
            }
            {/* ----------------------------------------------- */}
            {talent.profile.toolsAndSkills &&
              <div className="mb1">
                <p className="c-FAV">my tools and skills</p>
                <p>{talent.profile.toolsAndSkills}</p>
              </div>
            }
            {/* ----------------------------------------------- */}
            {talent.profile.goal &&
              <div className="mb1">
                <p className="c-FAV">i want to achieve</p>
                <p>{talent.profile.goal}</p>
              </div>
            }
            {/* ----------------------------------------------- */}
          </div> : ""
        }
        <button className="bg-FAV" onClick={() => setShowInfos(!showInfos)}>{showInfos ? "close" : "read more"}</button>
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
        <h1 className="c-FAV">projects</h1>
        <p className="c-FAV mb2">({talent.myProjects.length})</p>
          {talent.myProjects.length ? 
          talent.myProjects.map(project => <MyProjectCard key={project._id} project={project} user={user} />) : 
          <p>It is time for your first project.</p>}
      </div>
      
      <div className="bo-DARK"></div>
      <div>
        <h1 className="central c-FAV">following</h1>
        <p className="central c-FAV mb2">({talent.follows.length})</p>
        {talent.follows.length ? 
        talent.follows.map(follow => <TalentCard key={follow._id} talent={follow} user={user}/> ):
        <p>You´re not following anybody!</p>
        }
      </div>
      <div className="bo-DARK"></div>
      <div className="central col">
        <h1 className="c-FAV mb1">contact</h1>
        {showContact ?
          <div className="col mb1">
            {/* ----------------------------------------------- */}
            {talent.contact.mobile &&
              <div className="mb1">
                <p className="c-FAV">phone number</p>
                <p>{talent.contact.mobile}</p>
              </div>
            }
            {/* ----------------------------------------------- */}
            {talent.contact.website &&
              <div className="mb1">
                <p className="c-FAV">website</p>
                <p>{talent.contact.website}</p>
              </div>
            }
            {/* ----------------------------------------------- */}
            {(talent.contact.online1 || talent.contact.online2 || talent.contact.online3) &&
              <div>
                <p className="c-FAV">online profiles</p>
              </div>
            }
            {talent.contact.online1 &&
              <div className="mb1">
                <p>{talent.contact.online1}</p>
              </div>
            }
            {talent.contact.online2 &&
              <div className="mb1">
                <p>{talent.contact.online2}</p>
              </div>
            }
            {talent.contact.online3 &&
              <div className="mb1">
                <p>{talent.contact.online3}</p>
              </div>
            }
            {/* ----------------------------------------------- */}
          </div> : ""
        }
        <button className="bg-FAV" onClick={() => setShowContact(!showContact)}>{showContact ? "close" : "show me"}</button>
      </div>
    <Footer />
    <ToastContainer/>
  </> 
  ) 
};


export default UserDetails;