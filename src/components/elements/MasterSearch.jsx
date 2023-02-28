import { ProjectCardS } from "./ProjectCard.jsx";
import { TalentCardS } from "./TalentCard.jsx";
import { useContext } from "react";

//  ICONS
import { MdOutlineClose as X } from "react-icons/md";

import UserContext from "../../context/userContext.jsx";

const MasterSearch = ({ projects, talents, setShowSearch, showSearch }) => {
  const [user, setUser] = useContext(UserContext);
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const darkMode = user.meta.darkMode;

  return (
    <div className="burger-container rel ">
      <div id={darkMode && "bgG"}>
        <p className="info center">search results</p>
        <div className="scroll-container">
          <div className="mr15">
            {talents.length > 0 && (
              <>
                {/* <p className={`${color} fw700 mb1 central`}>talents</p> */}
                {talents.map(
                  (talent, i) =>
                    talent.profile.isTalent &&
                    talent._id !== user._id && (
                      <div className="flex" onClick={() => setShowSearch(false)} key={i}>
                        <TalentCardS
                          talent={talent}
                          user={user}
                          darkMode={darkMode}
                        />
                      </div>
                    )
                )}
              </>
            )}
          </div>
          <div className="mt1">
            {projects.length > 0 && (
              <>
                {/* <p className={`${color} fw700 mt2 mb1 central`}>projects</p> */}
                {projects.map((project, i) => (
                  <div onClick={() => setShowSearch(false)} key={i}>
                    <ProjectCardS
                      project={project}
                      user={user}
                      darkMode={darkMode}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="central" onClick={() => setShowSearch(false)}>
            <button
              className={`circle40 ${bg} central BrgClsBtn`}
              title="close"
            >
              <X />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterSearch;
