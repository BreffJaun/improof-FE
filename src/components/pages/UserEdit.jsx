import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";
import { host } from "../../api/host.jsx";
import { useNavigate } from "react-router-dom";


import UserContext from "../../context/userContext.jsx";
import "../../styles/colors.scss"


//ICONS
import { AiOutlineCamera } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { SlTrash } from "react-icons/sl";
import {RxCross2} from "react-icons/rx"



//BUTTONS
import { FollowBtn } from "../buttons/FollowBtn.jsx"
import { SendMessageBtn } from "../buttons/MessageBtn.jsx";


//ELEMENTS
import { MyProjectCard } from "../elements/ProjectCard.jsx";
import { TalentCard } from "../elements/TalentCard.jsx";
import Up from "../elements/Up.jsx";
import Footer from "../elements/Footer.jsx";


const UserEdit = () => {

  const {id} = useParams("id")
  const [user, setUser] = useContext(UserContext)
  const initialUserData = {...user}
  delete initialUserData.profile.password
  const [userData, setUserData] = useState(initialUserData)
  console.log("userdata",userData)
  console.log("user",user);

  const [talent, setTalent] = useState(undefined)
  const [isPending, setIsPending] = useState(true)
  const [showContact, setShowContact] = useState(false)
  const [showInfos, setShowInfos] = useState(false)

  const navigate = useNavigate()

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
  }, [id])
  


  const handleInputProfile = (event) => {
    setUserData({ ...userData, profile:{...userData.profile, [event.target.name]: event.target.value }});
  }

  const handleInputLocation = (event) => {
    setUserData({ ...userData, location:{...userData.location, [event.target.name]: event.target.value }});
  }

  const handleInputContact = (event) => {
    setUserData({ ...userData, contact:{...userData.contact, [event.target.name]: event.target.value }});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateUserData = async () => {
      await fetch(`${host}/users/${user._id}`,
        {
          credentials: "include",
          method: "PATCH",
          body: JSON.stringify(userData),
          headers: { "Content-type": "application/json; charset=UTF-8", },
        })
        .then((json) => json.json())
        .then((data) => {
          if (data.error) {
            data.error.map((err) => {
              toast.error(err.msg, toastOptions);
          });
          }
          console.log(data)
      });
    };
    updateUserData()
  }


  return !isPending && user.profile.isTalent ?
  <>
      <form onSubmit={handleSubmit}>
      <div className="central col mt3">
        <div className="circle90 bg-FAV central rel">
          {talent.profile.avatar ? <img src="" alt="" /> :
            <div className="initials"><p>{talent.profile.initials}</p></div>
        }
        <div
          title="upload image"
          className="circle40 bg-FAV central editBtn">
        <p className="c-A100"><AiOutlineCamera/>
        </p>
      </div>
      </div>
        <h1 className="central c-FAV mt05">Hi, {talent.profile.firstName}!</h1>
        <p className="central c-FAV">Let´s spice up your profile!</p>
      </div>
    
      <div className="col mt2 mb1">
        <p>first name<span className="c-FAV fw900">*</span></p>
        <input onChange={handleInputProfile} name="firstName" type="text" defaultValue={user.profile.firstName} />
      </div>
      <div className="col mb1">
        <p>last name<span className="c-FAV fw900">*</span></p>
        <input onChange={handleInputProfile} name="lastName"  type="text" defaultValue={user.profile.lastName} />
      </div>
      <div className="col mb1">
        <p>that´s me</p>
        <input onChange={handleInputProfile} name="description" type="text" defaultValue={user.profile.description} />
      </div>
      <div className="col mb1">
        <p>i do right now</p>
        <input onChange={handleInputProfile} name="position" type="text" defaultValue={user.profile.position} />
      </div>
      <div className="col mb1">
        <p>i want to achieve</p>
        <input onChange={handleInputProfile} name="goal" type="text" defaultValue={user.profile.goal} />
      </div>

      
      <div className="bo-DARK"></div>
      <h1 className="central c-FAV mt05">contact</h1>
      <div className="col mb1">
        <p>mobile</p>
        <input onChange={handleInputContact} name="mobile" type="text" defaultValue={user.contact.mobile} />
      </div>
      <div className="col mb1">
        <p>own website</p>
        <input onChange={handleInputContact} name="website" type="text" defaultValue={user.contact.website} />
      </div>
      <div className="col mb1">
        <p>1st online profile</p>
        <input onChange={handleInputContact} name="online1" type="text" defaultValue={user.contact.online1} />
      </div>
      <div className="col mb1">
        <p>2nd online profile</p>
        <input onChange={handleInputContact} name="online2" type="text" defaultValue={user.contact.online2} />
      </div>
      <div className="col mb1">
        <p>3rd online profile</p>
        <input onChange={handleInputContact} name="online3" type="text" defaultValue={user.contact.online3} />
      </div>

      <div className="bo-DARK"></div>
      <h1 className="central c-FAV mt05">location</h1>
      <div className="col mb1">
        <p>street</p>
        <input onChange={handleInputLocation} name="street" type="text" defaultValue={user.location.street} />
      </div>
      <div className="col mb1">
        <p>zip</p>
        <input onChange={handleInputLocation} name="zip" type="text" defaultValue={user.location.zip} />
      </div>
      <div className="col mb1">
        <p>city</p>
        <input onChange={handleInputLocation} name="city" type="text" defaultValue={user.location.city} />
      </div>

      <div className="bo-DARK"></div>
      <h1 className="central c-FAV mt05">security</h1>
      <div className="col mb1">
        <p>set new password</p>
        <input name="" type="text" placeholder="new password"/>
      </div>
      <div className="col mb1">
        <p>confirm new password</p>
        <input name="" type="text" placeholder="confirm password"/>
    </div>
    
    <div className="bo-DARK"></div>
    <div className="central">
      <button
        type="submit"
        title="save changes"
        className="bg-FAV"><BiCheck />
      </button>
        <button
          onClick={() => navigate(`/userdetails/${user._id}`)}
        title="cancel"
        className="bg-FAV"><RxCross2 />
      </button>
    </div>

    <Footer />
    <ToastContainer/>
    </form>
  </>

    : user.profile.isRecruiter && !isPending ? 
    <>
    <form onSubmit={handleSubmit}>
        <div className="central col mt3">
          <div className="circle90 bg-FAV central rel">
            {user.profile.avatar ? <img src="" alt="" /> :
              <div className="initials"><p>{user.profile.initials}</p></div>
          }
          <div
            title="upload image"
            className="circle40 bg-FAV central editBtn">
          <p className="c-A100"><AiOutlineCamera/>
          </p>
        </div>
        </div>
          <h1 className="central c-FAV mt05">Hi, {user.profile.firstName}!</h1>
          <p className="central c-FAV">Time to find some talents!</p>
        </div>
      
        <div className="col mt2 mb1">
          <p>first name<span className="c-FAV fw900">*</span></p>
          <input onChange={handleInputProfile} name="firstName" type="text" defaultValue={user.profile.firstName} />
        </div>
        <div className="col mb1">
          <p>last name<span className="c-FAV fw900">*</span></p>
          <input onChange={handleInputProfile} name="lastName" type="text" defaultValue={user.profile.lastName} />
        </div>
        <div className="col mb1">
          <p>that´s me</p>
          <input onChange={handleInputProfile} name="description" type="text" defaultValue={user.profile.description} />
        </div>

        <div className="bo-DARK"></div>
        <h1 className="central c-FAV mt05">contact</h1>

        <div className="col mb1">
          <p>company</p>
          <input onChange={handleInputContact} name="company" type="text" defaultValue={user.profile.company} />
        </div>
        <div className="col mb1">
          <p>position</p>
          <input onChange={handleInputContact} name="position" type="text" defaultValue={user.profile.position} />
        </div>

        <div className="col mb1">
          <p>company website</p>
          <input onChange={handleInputContact} name="website" type="text" defaultValue={user.contact.website} />
        </div>

        <div className="bo-DARK"></div>
        <h1 className="central c-FAV mt05"></h1>
        <div className="col mb1">
          <p>city</p>
          <input onChange={handleInputLocation} name="city" type="text" defaultValue={user.location.city} />
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
      
      <div className="bo-DARK"></div>
      <div className="central">
        <button
          type="submit"
          title="save changes"
          className="bg-FAV"><BiCheck />
        </button>
        <button
          onClick={() => navigate(`/userdetails/${user._id}`)}
          title="cancel"
          className="bg-FAV"><RxCross2 />
        </button>
      </div>
      <Footer />
      <ToastContainer/>
    </form>
    </> 
  :
  null
};


export default UserEdit;