import "../../styles/cards.scss";
import "../../styles/colors.scss";
import "../../styles/banner.scss";
import "../../styles/carouselcard.scss"

import { useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext.jsx";

// ELEMENTS
import ProjectBtn from "../buttons/ProjectBtn.jsx";
// import { AiOutlineCamera as Camera } from "react-icons/ai"
import { FiCameraOff as Camera} from "react-icons/fi"



const News = ({ project, user }) => {
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const darkMode = user.meta.darkMode;
  const width = window.innerWidth

  const navigate = useNavigate();
  return Object.keys(project).length &&
    <>
    <div className="central">
        <div className="carousel-card" >
          <div className="optic-container central col bg-gA">
            {!project.thumbnail && (
            <div
                className="no-image-container"
                onClick={() => navigate(`/projectdetails/${project._id}`)}>
                <h1><Camera /></h1>
                <p>i have no photo for you today!</p>
              </div>
            )}
            {project.thumbnail && (
              <div
                className="image-container"
                onClick={() => navigate(`/projectdetails/${project._id}`)}>
                  <div className="image">
                    <img src={project.thumbnail} alt="" />
                  </div>
              </div>
            )}
        </div>
        <div className="text-container">
          <div>
            <div onClick={() => navigate(`/projectdetails/${project._id}`)}>
              <h3>{project?.name}</h3>

              {width > 775 && <p className="c-A60">{project.description.length > 80 ? project?.description.slice(0, 80) + "..." : project?.description}</p>}
            </div>
            <div>
              {project?.team?.length && width > 775 &&(
                <div className="members-container col">
                  <div className="members">
                    <div className="flex">
                      {project?.team?.length &&
                        project?.team?.map((member) => (
                          <div key={member._id} className="col central">
                            <div className="col central">
                              <div
                                className="members-image-container bg-FAV central"
                                onClick={() => navigate(`/userDetails/${member._id}`)}
                                key={member._id}
                              >
                              {member?.profile?.avatar ? (
                                <img src={member.profile.avatar}/>
                              ) : (
                                <p className="initials">
                                  {member.profile?.initials}
                                </p>
                              )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="central star">
              <div className={`circle50 central`}>
                <ProjectBtn project={project} user={user} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
};





export default News;
