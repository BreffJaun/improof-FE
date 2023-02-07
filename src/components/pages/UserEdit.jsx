import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { host } from "../../api/host.jsx";

import UserContext from "../../context/userContext.jsx";
import "../../styles/colors.scss"


//ICONS


//BUTTONS
import {FollowBtn} from "../buttons/FollowBtn.jsx"
import { SendMessageBtn } from "../buttons/MessageBtn.jsx";


//ELEMENTS
import { MyProjectCard } from "../elements/ProjectCard.jsx";
import { TalentCard } from "../elements/TalentCard.jsx";
import Up from "../elements/Up.jsx";
import Footer from "../elements/Footer.jsx";


const UserEdit = () => {

  const {id} = useParams("id")
  const [user, setUser] = useContext(UserContext)
  const [talent, setTalent] = useState(undefined)
  const [isPending, setIsPending] = useState(true)

  const [showContact, setShowContact] = useState(false)
  const [showInfos, setShowInfos] = useState(false)

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
      <div className="central col mt3">
        <div className="circle90 bg-FAV central">
          {talent.profile.avatar ? <img src="" alt="" /> :
            <div className="initials"><p>{talent.profile.initials}</p></div>
          }
        </div>
        <h1 className="central c-FAV mt05">edit {talent.profile.firstName} {talent.profile.lastName}</h1>
      </div>
    
      <div className="col mt2 mb1">
        <p>first name</p>
        <input type="text" placeholder={user.profile.firstName} />
      </div>
      <div className="col mb1">
        <p>last name</p>
        <input type="text" placeholder={user.profile.lastName} />
      </div>
      <div className="col mb1">
        <p>that´s me</p>
        <input type="text" placeholder={user.profile.description} />
      </div>
      <div className="col mb1">
        <p>i do right now</p>
        <input type="text" placeholder={user.profile.position} />
      </div>
      <div className="col mb1">
        <p>i want to achieve</p>
        <input type="text" placeholder={user.profile.goal} />
      </div>

      <div className="bo-DARK"></div>
      <h1 className="central c-FAV mt05">contact</h1>
      <div className="col mb1">
        <p>mobile</p>
        <input type="text" placeholder={user.contact.mobile} />
      </div>
      <div className="col mb1">
        <p>own website</p>
        <input type="text" placeholder={user.contact.website} />
      </div>
      <div className="col mb1">
        <p>1st online profile</p>
        <input type="text" placeholder={user.contact.online1} />
      </div>
      <div className="col mb1">
        <p>2nd online profile</p>
        <input type="text" placeholder={user.contact.online2} />
      </div>
      <div className="col mb1">
        <p>3rd online profile</p>
        <input type="text" placeholder={user.contact.online3} />
      </div>

      <div className="bo-DARK"></div>
      <h1 className="central c-FAV mt05">location</h1>
      <div className="col mb1">
        <p>street</p>
        <input type="text" placeholder={user.location.street} />
      </div>
      <div className="col mb1">
        <p>zip</p>
        <input type="text" placeholder={user.location.street} />
      </div>
      <div className="col mb1">
        <p>city</p>
        <input type="text" placeholder={user.location.street} />
      </div>

      <div className="bo-DARK"></div>
      <h1 className="central c-FAV mt05">security</h1>
      <div className="col mb1">
        <p>set new password</p>
        <input type="text" placeholder="new password"/>
      </div>
      <div className="col mb1">
        <p>confirm new password</p>
        <input type="text" placeholder="confirm password"/>
      </div>

    <Footer />
    <ToastContainer/>
  </> 
};


export default UserEdit;