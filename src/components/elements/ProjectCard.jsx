import "../../styles/cards.scss";
import "../../styles/colors.scss";
import "../../styles/banner.scss";

import { useContext } from "react";

// ICONS
import { RxCross2 } from "react-icons/rx";
import { HiPlus } from "react-icons/hi";
import { TalentCard } from "./TalentCard.jsx";
import { FollowBtn } from "../buttons/FollowBtn.jsx";
import ProjectBtn from "../buttons/ProjectBtn.jsx";

// CONTEXT
import DarkModeContext from "../../context/darkModeContext.jsx";

// ELEMENTS

const ProjectCardFollow = ({ projectName, projectDescription }) => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <div
      className={darkMode ? `project card-dark col` : `project card-light col`}
    >
      <div className="project-banner bg-FAV"></div>
      <div className="project-body">
        <div>
          <p className="c-FAV">{projectName}</p>
          <p className="c-A20">{projectDescription}</p>
        </div>
        <ProjectBtn />
      </div>
    </div>
  );
};

const ProjectFollow = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <div
      className={darkMode ? `project card-dark col` : `project card-light col`}
    >
      <div className="project-body">
        <div>
          <p className="c-FAV">project name</p>
          <p className="c-A20">
            description Lorem ipsum dolor sit amet consectetur{" "}
          </p>
        </div>
        <button className="action">
          <RxCross2 />
        </button>
      </div>
    </div>
  );
};

const ProjectCardAdd = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <div
      className={darkMode ? `project card-dark col` : `project card-light col`}
    >
      <div className="project-banner bg-FAV"></div>
      <div className="project-body">
        <div>
          <p
            className={
              darkMode ? `project card-dark col` : `project card-light col`
            }
          >
            project name
          </p>
          <p className={darkMode ? `` : `c-A20`}>
            description Lorem ipsum dolor sit amet consectetur{" "}
          </p>
        </div>
        <button className="action">
          <HiPlus />
        </button>
      </div>
    </div>
  );
};

const ProjectAdd = () => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <div
      className={darkMode ? `project card-dark col` : `project card-light col`}
    >
      <div className="project-body">
        <div>
          <p className="c-FAV">project name</p>
          <p className="c-A20">
            description Lorem ipsum dolor sit amet consectetur{" "}
          </p>
        </div>
        <button className="action">
          <HiPlus />
        </button>
      </div>
    </div>
  );
};

const MyProjectCard = ({ project, user }) => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <div
      className={darkMode ? `project card-dark col` : `project card-light col`}
    >
      <div className="project-banner bg-FAV"></div>
      <div className="project-body">
        <div>
          <div>
            <p className="c-FAV">{project?.name}</p>
            <p className={darkMode ? ` mt05` : `c-A20 mt05`}>
              {project?.description}
            </p>
          </div>
          <div className="mt15">
            {project?.team?.length && (
              <>
                <p className="c-FAV">contributors:</p>
                <div className="col mt05">
                  {project?.team?.length &&
                    project?.team?.map((member) => (
                      <TalentCard
                        key={member._id}
                        talent={member}
                        user={user}
                      />
                    ))}
                </div>
              </>
            )}
          </div>
          <div className="mt15">
            <p className="c-FAV">status:</p>
            <p className="c-A20 mt">{project?.private ? "closed" : "open"}</p>
          </div>
        </div>

        <div className="col">
          <ProjectBtn project={project} user={user} />
        </div>
      </div>
    </div>
  );
};

const ProjectCardNewsFeed = ({ project, user }) => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);

  return (
    <div
      className={darkMode ? `project card-dark col` : `project card-light col`}
    >
      <div className="project-banner bg-FAV"></div>
      <div className="project-body">
        <div>
          <div>
            <p className="c-FAV">{project?.name}</p>
            <p className={darkMode ? ` mt05` : `c-A20 mt05`}>
              {project?.description}
            </p>
          </div>
          <div className="mt15">
            {project?.team?.length && (
              <>
                <p className="c-FAV">contributors:</p>
                <div className="col mt05">
                  <div className="card talent flex">
                    {project?.team?.length &&
                      project?.team?.map((member) => (
                        <div
                          className="circle50 bg-FAV central"
                          onClick={() => navigate(`/userDetails/${member._id}`)}
                        >
                          {member?.profile?.avatar ? (
                            <img src={member.profile.avatar} width="50" />
                          ) : (
                            <p className="initials">
                              {member.profile?.initials}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="col">
          <ProjectBtn project={project} user={user} />
        </div>
      </div>
    </div>
  );
};

export {
  ProjectCardFollow,
  ProjectCardAdd,
  ProjectFollow,
  ProjectAdd,
  MyProjectCard,
  ProjectCardNewsFeed,
};
