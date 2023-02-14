import { MyProjectCard, ProjectCardNewsFeed } from "./ProjectCard.jsx";
import { TalentCard } from "./TalentCard.jsx";
import { useContext } from "react";

import UserContext from "../../context/userContext.jsx";

const MasterSearch = ({projects, talents, setShowSearch, showSearch}) => {
  const [user, setUser] = useContext(UserContext)

  return (
    <div className="burger-container rel">
      <div>
        <div>
          {
          talents.length > 0 && 
          <>
            <h1>Talents</h1>
            {talents.map((talent, i) => talent.profile.isTalent && talent._id !== user._id && 
              <div onClick={()=>setShowSearch(false)}  key={i}>
                <TalentCard 
                talent={talent} 
                user={user} /> 
              </div> 
            )}

          </>
          }
        </div>
        <div>          
          {
          projects.length && 
          <>
            <h1>Projects</h1>
            {projects.map((project, i) => 
              <div onClick={()=>setShowSearch(false)} key={i}>
                <ProjectCardNewsFeed 
                project={project} 
                user={user} /> 
              </div>
            )}

          </>
          }
        </div>
      </div>
    </div>
  );
};

export default MasterSearch;