import { host } from "../../api/host.jsx";
import { useContext, useEffect, useState } from "react";

//ELEMENTE 
import { TalentCard } from "../elements/TalentCard.jsx";
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import Footer from "../elements/Footer.jsx";

// CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";
import UserContext from "../../context/userContext.jsx";

const Community = () => {
  const [category, setCategory] = useState(undefined)
  const [talents, setTalents] = useState(undefined)
  const [user, setUser] = useContext(UserContext)
  const [trigger, setTrigger] = useContext(TriggerContext)
  const [isPending, setPending] = useState(true)



console.log(category)

useEffect( () => {
  setPending(true)
  const getUsers = async () => {
    fetch(`${host}/users`)
      .then((response) => response.json())
      .then((json) => {
          const onlyTalents = json.filter(user => user.profile.isTalent)
          setTalents(onlyTalents)
          setPending(false)
      });
  }
  getUsers()
},[category])

useEffect(() => {
  fetch(`${host}/users/checklogin`,{
      credentials:"include"
  })
  .then((response) => response.json())
  .then((json) => {
      if(json.status){
          setUser(json.user)
      }else{
          navigate("/login")
      }
  });  
},[trigger, category])



  return !isPending && (
    <>
      <div className="bo-DARK"></div>
      <h1 className="central c-FAV mb2">community</h1>

      <div className="central">
        <CategoriesFilter setCategory={setCategory}/>
      </div>
        
      <div className="mb2 mt2">
        <p className="sl c-FAV">i follow</p>
      </div>
      {user.follows.length === 0 && !category ?
      <p>Time to get some friends you creep</p> : 
      user.follows.map(talent => 
        talent.profile.category && talent.profile.category === category &&
        <TalentCard
        key={talent._id}
        talent={talent}
        user={user} 
        />
      )} 
      {!category &&      
      user.follows.map(talent =>         
        <TalentCard
        key={talent._id}
        talent={talent}
        user={user} 
        />
      )}

      <div className="bo-DARK"></div>

      <div className="mb2 mt2">
        <p className="sl c-FAV">meet new talents</p>
      </div>

      {talents && talents.map((talent) =>
        !user.follows.find(follow => follow._id === talent._id || talent._id === user._id) &&
        talent.profile.category && talent.profile.category === category && 
        <TalentCard
        key={talent._id}
        talent={talent}
        user={user} 
        />
      )} 
      {!category &&      
        talents?.map(talent => 
          !user.follows.find(follow => follow._id === talent._id || talent._id === user._id) &&        
          <TalentCard
          key={talent._id}
          talent={talent}
          user={user} 
          />
      )}  
      <Footer/>
    </>
  );
};

export default Community;