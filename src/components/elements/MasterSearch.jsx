import { ProjectCardS, ProjectCardNewsFeed } from "./ProjectCard.jsx";
import { TalentCard, TalentCardS } from "./TalentCard.jsx";
import { useContext } from "react";

import UserContext from "../../context/userContext.jsx";

const MasterSearch = ({projects, talents, setShowSearch, showSearch}) => {
  const [user, setUser] = useContext(UserContext)
  const color = user.meta.colorTheme[0]
  const bg = user.meta.colorTheme[1]
  

  return (
    <div className="burger-container rel">
      <div>
        <p className="mb2 info center">search results</p>
        <div className="scroll-container">
          <div className="col mr1">
          {
          talents.length > 0 && 
          <>
            <p className={`${color} fw700 mb1 central`}>talents</p>
            {talents.map((talent, i) => talent.profile.isTalent && talent._id !== user._id && 
              <div onClick={()=>setShowSearch(false)}  key={i}>
                <TalentCardS 
                talent={talent} 
                user={user} /> 
              </div> 
            )}

          </>
          }
        </div>
        <div>          
          {
          projects.length > 0 && 
          <>
            <p className={`${color} fw700 mt2 mb1 central`}>projects</p>
            {projects.map((project, i) => 
              <div onClick={()=>setShowSearch(false)} key={i}>
                <ProjectCardS 
                project={project} 
                user={user} /> 
              </div>
            )}

          </>
          }
        </div>
      </div>
      </div>
      </div>
  );
};

export default MasterSearch;