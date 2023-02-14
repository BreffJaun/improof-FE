import { MyProjectCard, ProjectCardNewsFeed } from "./ProjectCard.jsx";
import { TalentCard } from "./TalentCard.jsx";
import { useContext } from "react";

import UserContext from "../../context/userContext.jsx";

const MasterSearch = ({projects, talents}) => {
  const [user, setUser] = useContext(UserContext)
  console.log("projects",projects, "talents",talents);
  return (
    <div className="burger-container rel">
      <div>
        <div>
          {
          talents.length > 0 && 
          <>
            <h1>Talents</h1>
            {talents.map(talent => talent.profile.isTalent && talent._id !== user._id && <TalentCard talent={talent} user={user}/> )}
          </>
          }
        </div>
        <div>          
          {
          projects.length && 
          <>
            <h1>Projects</h1>
            {projects.map(project => <ProjectCardNewsFeed project={project} user={user}/>)}
          </>
          }
        </div>
      </div>
    </div>
  );
};

export default MasterSearch;