import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import Footer from "../elements/Footer.jsx";
import Newsfeed from "../elements/Newsfeed.jsx";
import {TalentCardFollow, TalentCardAdd} from "../elements/TalentCard.jsx";
import { host } from "../../api/host.jsx";

import { useContext, useEffect, useState } from "react";

// CONTEXT
import UserContext from "../../context/userContext.jsx";

const Community = () => {
const [talents, setTalents] = useState(undefined)
const [user, setUser] = useContext(UserContext)
const [trigger, setTrigger] = useState(true)


useEffect( () => {
  const getUsers = async () => {
    fetch(`${host}/users`)
      .then((response) => response.json())
      .then((json) => {
          const onlyTalents = json.filter(user => user.profile.isTalent)
          setTalents(onlyTalents)
      });
  }
  getUsers()
},[])

// DER TRIGGER MUSS AUF GET USER GESETZT WERDEN!! 

console.log(trigger);
  return (
    <>
      <div className="bo-DARK"></div>
      <h1 className="central c-FAV mb2">community</h1>
      <div className="mb2 mt2">
        <p className="sl c-FAV">i follow</p>
        <CategoriesFilter/>
      </div>
      {user?.follows?.length === 0 ?
      <p>Time to get some friends you creep</p> : 
      user?.follows?.map(talent => 
      <TalentCardFollow
      follower={talent}
      key={talent._id}       
      userId={user?._id}
      trigger={trigger} 
      setTrigger={setTrigger}     
      />
      )}

      <div className="bo-DARK"></div>

      <div className="mb2 mt2">
        <p className="sl c-FAV">meet new talents</p>
        <CategoriesFilter/>
      </div>

      {talents && talents.map((talent)=> 
        <TalentCardAdd
        key={talent._id}       
        follower={talent}
        userId={user?._id}
        trigger={trigger}
        setTrigger={setTrigger} 
        /> 
      )}  

      <Footer/>
    </>
  );
};

export default Community;