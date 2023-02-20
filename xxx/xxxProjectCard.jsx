import "../../styles/cards.scss";
import "../../styles/colors.scss";
import "../../styles/banner.scss";

import { useNavigate } from "react-router-dom";

// ICONS
import { RxCross2 } from "react-icons/rx";
import { HiPlus } from "react-icons/hi";
import ProjectBtn from "../src/components/buttons/ProjectBtn.jsx";

import { AiOutlineCamera as Camera} from "react-icons/ai"

// ELEMENTS
import { TalentCard } from "../src/components/elements/TalentCard.jsx";

const ProjectCardFollow = () => {
  return (
    <div className="project card col">
      <div className="project-banner"></div>
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

const ProjectFollow = () => {
  return (
    <div className="project card col">
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
  return (
    <div className="project card col">
      <div className="project-banner bg-FAV"></div>
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

const ProjectAdd = () => {
  return (
    <div className="project card col">
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
  const navigate = useNavigate();
  return (
    project &&
    user && (
      <div className="project card col">
        {project.thumbnail && (
          <div
            className="project-banner bg-FAV"
            onClick={() => navigate(`/projectdetails/${project._id}`)}
          ></div>
        )}
        <div className="project-body">
          <div>
            <div>
              <p className="c-FAV">{project?.name}</p>
              <p className="c-A20 mt05">{project?.description}</p>
            </div>
            <div className="mt15">
              {project?.team?.length && (
                <>
                  <p className="c-FAV">contributors:</p>
                  <div className="col mt05">
                    {project?.team?.length &&
                      project?.team?.map((member) => {
                        // console.log("member", member)
                        // console.log("USERID", user._id)
                        // console.log(user._id !== member._id);
                        if (member._id !== user._id) {
                          return (
                            <TalentCard
                              key={member._id}
                              talent={member}
                              user={user}
                            />
                          );
                        }
                      })}
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
    )
  );
};


const ProjectCardNewsFeed = ({ project, user }) => {
  const navigate = useNavigate();
  return ( Object.keys(project).length > 0 &&
    <div className="project card col">
      {project.thumbnail && (
        <div
          className="project-banner bg-FAV"
          onClick={() => navigate(`/projectdetails/${project._id}`)}
        ></div>
      )}
      <div className="project-body">
        <div>
          <div onClick={() => navigate(`/projectdetails/${project._id}`)}>
            <p className="c-FAV">{project?.name}</p>
            <p className="mt05 c-A20">{project?.description}</p>
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
                          key={member._id}
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




const ProjectCard = ({ project, user }) => {
  const navigate = useNavigate();
  return (Object.keys(project).length > 0 &&
    <div className="col">
      <div className="project card col">
        {!project.thumbnail && (
          <div
            className="project-banner bg-gA central col"
            onClick={() => navigate(`/projectdetails/${project._id}`)}>
            <h1><Camera /></h1>
            <p>A picture says more than 1000 words.</p>
          </div>
        )}
        {project.thumbnail && (
          <div
            className="project-banner bg-FAV"
            onClick={() => navigate(`/projectdetails/${project._id}`)}
          ></div>
        )}

        <div>
          {project?.team?.length && (
            <div className="contributors-container col rel">
              <div className="contributors">
                <div className="flex">
                  {project?.team?.length &&
                    project?.team?.map((member) => (
                      <div
                        key={member._id}
                        className="contributor-image bg-FAV central"
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
            </div>
          )}
        </div>
        <div className="project-body col rel">
          <div onClick={() => navigate(`/projectdetails/${project._id}`)}>
            <h3 className="mt035 fw900">{project?.name}</h3>
            <p className="mt015">{project?.description}</p>
          </div>
          <div className="star central">
            <div>
              <ProjectBtn project={project} user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




export {
  ProjectCard,
  ProjectCardFollow,
  ProjectCardAdd,
  ProjectFollow,
  ProjectAdd,
  MyProjectCard,
  ProjectCardNewsFeed,
};