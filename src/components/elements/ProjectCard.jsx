import { useNavigate } from "react-router-dom";

// STYLES
import "../../styles/cards.scss";
import "../../styles/colors.scss";
import "../../styles/banner.scss";

// ICONS
import { FiCameraOff as Camera } from "react-icons/fi";

// ELEMENTS
import ProjectBtn from "../buttons/ProjectBtn.jsx";



const ProjectCard = ({ project, user, darkMode }) => {
  const navigate = useNavigate();
  return (
    Object.keys(project).length > 0 && (
      <div className="col">
        <div className="project col">

          {/* project banner */}
          {!project.thumbnail && (
            <div
              className="shadow-s project-banner bg-gA central col"
              onClick={() => navigate(`/projectdetails/${project._id}`)}
            >
              <h1>
                <Camera />
              </h1>
              <p>i have no photo for you today!</p>
            </div>
          )}
          {project.thumbnail && (
            <img
              className="shadow-s project-banner bg-FAV"
              src={project.thumbnail}
              alt=""
              onClick={() => navigate(`/projectdetails/${project._id}`)}
            />
          )}

          {/* project contributors */}
          <div>
            {project?.team?.length && (
              <div className="contributors-container col rel">
                <div className="contributors">
                  <div className="flex">
                    {project?.team?.length &&
                      project?.team?.map((member) => (
                        <div
                          key={member._id}
                          className="contributor-image-container bg-FAV central shadow-l"
                          onClick={() =>
                            navigate(`/userDetails/${member._id}`)
                          }
                        >
                          {member?.profile?.avatar ? (
                            <img src={member.profile.avatar} />
                          ) : (
                            <p className="initials">
                              {member.profile?.initials}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* project body */}
          <div
            className={
              darkMode ?
                "project-body rel card bgG" :
                "project-body rel card"
            }
          >
            <div onClick={() => navigate(`/projectdetails/${project._id}`)}>
              <h3 className="fw900 overflowHeader">{project?.name}</h3>
              <p className="mt035 overflow">{project?.description}</p>
            </div>
            <div className="star central">
              <div>
                <ProjectBtn project={project} user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};



const ProjectCardS = ({ project, user, darkMode }) => {
  const navigate = useNavigate();
  return (
    Object.keys(project).length > 0 && (
      <div className="col">
        <div className="projectS card col">
          {!project.thumbnail && (
            <div
              className="project-banner bg-gA central col"
              onClick={() => navigate(`/projectdetails/${project._id}`)}
            >
              <h1>
                <Camera />
              </h1>
              <p>i have no photo for you today!</p>
            </div>
          )}
          {project.thumbnail && (
            <img
              className="project-banner bg-FAV"
              src={project.thumbnail}
              alt=""
              onClick={() => navigate(`/projectdetails/${project._id}`)}
            />
          )}
          {/* <div>
            {project?.team?.length && (
              <div className="contributors-containerS col rel">
                <div className="contributors">
                  <div>
                    {project?.team?.length &&
                      project?.team?.map((member) => (
                        <div
                          key={member._id}
                          className="contributor-image-container bg-FAV"
                          onClick={() => navigate(`/userDetails/${member._id}`)}
                        >
                          {member?.profile?.avatar ? (
                            <img src={member.profile.avatar} />
                          ) : (
                            <p className="initials">
                              {member.profile?.initials}
                            </p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div> */}
          <div
            className={
              darkMode ? "project-body w100d col rel bgG" : "project-body w100d col rel"
            }
          >
            <div onClick={() => navigate(`/projectdetails/${project._id}`)}>
              <h3 className="mt035 fw900 overflowHeader">{project?.name}</h3>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export { ProjectCard, ProjectCardS };
