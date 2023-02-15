import "../../styles/cards.scss";
import "../../styles/colors.scss";
import "../../styles/banner.scss";
import "../../styles/newscard.scss"

import { useNavigate } from "react-router-dom";

// ELEMENTS
import ProjectBtn from "../buttons/ProjectBtn.jsx";
// import { AiOutlineCamera as Camera } from "react-icons/ai"
import { FiCameraOff as Camera} from "react-icons/fi"



const News = ({ project, user }) => {
  const navigate = useNavigate();
  return ( Object.keys(project).length > 0 &&
    <div className="news">
      {!project.thumbnail && (
        <div
          className="news-banner bg-gA central col"
          onClick={() => navigate(`/projectdetails/${project._id}`)}>
          <h1><Camera /></h1>
          <p>i have no photo for you today!</p>
        </div>
      )}
      {project.thumbnail && (
        <div
          className="news-banner bg-gA"
          onClick={() => navigate(`/projectdetails/${project._id}`)}
        ></div>
      )}
      <div className="news-body">
        <div>
          <div onClick={() => navigate(`/projectdetails/${project._id}`)}>
            <p className="c-FAV">{project?.name}</p>
            <p className="mt05 c-A20">{project?.description}</p>
          </div>
        <div>
          {project?.team?.length && (
            <div className="members-container col rel">
              <div className="members">
                <div className="flex">
                  {project?.team?.length &&
                    project?.team?.map((member) => (
                      <div
                        key={member._id}
                        className="members-image-container bg-FAV central"
                        onClick={() => navigate(`/userDetails/${member._id}`)}
                      >
                        {member?.profile?.avatar ? (
                          <img src={member.profile.avatar}/>
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
        </div>
        <div className="col">
          <ProjectBtn project={project} user={user} />
        </div>
      </div>
    </div>
  );
};





export default News;
