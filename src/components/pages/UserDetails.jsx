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
      <div className="circle70">
        {talent?.profile?.avatar ? <img src="" alt="" /> : <p>{talent?.profile?.initials}</p>}
      </div>
    </div>
  );
};

export default UserDetails;