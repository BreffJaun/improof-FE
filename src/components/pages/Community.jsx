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

console.log(user);
  return (
    <>
      <div className="mb2 mt2">
        <Newsfeed/>
        <CategoriesFilter/>
      </div>
      <div className="bo-DARK"></div>

      <h1 className="central c-FAV mb2">community</h1>
      <div className="mb2 mt2">
        <p className="sl c-FAV">i follow</p>
        <CategoriesFilter/>
      </div>
      {user?.follows?.length === 0 ?
      <p>Time to get some friend you creep</p> : 
      user?.follows?.map(talent => <TalentCardFollow
      key={talent._id} 
      talentId={talent._id}
      userId={user?._id}
      firstName={talent.profile.firstName}
      lastName={talent.profile.lastName}
      img={talent.profile.avatar}
      initials={talent.profile.initials}
      position={talent.profile.position}
      />)}
      
     


      <div className="bo-DARK"></div>

      <div className="mb2 mt2">
        <p className="sl c-FAV">meet new talents</p>
        <CategoriesFilter/>
      </div>

      {talents && talents.map((talent)=> <TalentCardAdd
      key={talent._id}
      talentId={talent._id}
      userId={user?._id}
      firstName={talent.profile.firstName}
      lastName={talent.profile.lastName}
      img={talent.profile.avatar}
      initials={talent.profile.initials}
      position={talent.profile.position}
      /> )}  

      <Footer/>
    </>
  );
};

export default Community;