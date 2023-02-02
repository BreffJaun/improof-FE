import "../../styles/elements.scss"
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import UserContext from "../../context/userContext.jsx";
import { host } from "../../api/host.jsx";

const UserDetails = () => {
  const {id} = useParams("id")
  const [user, setUser] = useContext(UserContext)
  const [talent, setTalent] = useState(undefined)

  useEffect(() => {

    const getUser = ()=>{
      fetch(`${host}/users/${id}`,{
      credentials:"include"
      })
      .then((response) => response.json())
      .then((json) => {
        if(json.status){
          setTalent(json.userData)
        }
      })};
    getUser()
  },[])

  console.log(talent);
  return (
    <div>
      <div className="circle70 bg-FAV">
        {talent?.profile?.avatar ? <img src="" alt="" /> : <p>{talent?.profile?.initials}</p>}
      </div>
      <div className="c-FAV">
        <h2>{talent?.profile?.firstName} {talent?.profile?.lastName}</h2>
        <p>{talent?.profile?.description ? talent?.profile?.description : "no description"}</p>
      </div>
    </div>
  );
};

export default UserDetails;