// STYLE
import "../../styles/project-details.scss";
import "../../styles/chrono.scss";
// import "../../styles/project-details.scss"
// import "../../styles/chrono.scss"


import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chrono } from "react-chrono";
import { host } from "../../api/host.jsx";

//CONTEXT
import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";

//ELEMENTS
import { TalentCard } from "../elements/TalentCard.jsx";
import Footer from "../elements/Footer.jsx";
import StoneCard from "../elements/StoneCard.jsx";

// ICONS
import { AiOutlineEdit as Edit } from "react-icons/ai"

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const [project, setProject] = useState({});
  const [isPending, setPending] = useState(true);
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const [openStoneCard, setOpenStoneCard] = useState();
  const [stone, setStone] = useState({});

  // FETCH CURR PROJECT
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setPending(true);
    const fetchProject = async () => {
      fetch(`${host}/projects/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setProject(json.data);
            setPending(false);
          }
        });
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    const getUser = async () => {
      await fetch(`${host}/users/checklogin`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setUser(json.user);
          } else {
            navigate("/login");
          }
        });
    };
    getUser();
  }, [trigger]);
  const seeStoneDetails = (stoneId) => {
    setOpenStoneCard(stoneId);
    setStone(project.stoneId);
    console.log(stone);
  };

  return (
    !isPending &&
    user && (
      <div>
        <div className="central col mb2">
          {project.thumbnail && (
            <img src={project.thumbnail} alt="Thumbnail" width="350" />
          )}
          <h1 className={color}>"{project.name}"</h1>
          <h4 className={color}>{project.description}</h4>
        </div>
        {project.team.find((member) => member._id === user._id) && (
          <div className="center">
            <button
              className={`${bg} circle30 central`}
              onClick={() => navigate(`/projectedit/${project._id}`)}
            >
              <h3>
                <Edit />
              </h3>
            </button>
            <p>edit project</p>
          </div>
        )}


        {project.team.find((member) => member._id === user._id) && (
          <div className="center">
            <button
              className={`${bg} circle60`}
              onClick={() => navigate(`/createStone/${project._id}`)}
            >
              create stone
            </button>
          </div>
        )}

        <Chrono>
          {!isPending &&
            project.stones.map((stone) => {
              return (
                <div key={stone._id}>
                  {stone.media && <img src="" alt="" />}
                  <h1>{stone.title}</h1>
                  {/* <p>{stone.kind}</p> */}
                  {/* <p>{stone.description}</p> */}
                  <div className="mt1 flex g05">
                    {stone?.team?.map((member) => (
                      <div key={member._id} className="circle50 bg-FAV central">
                        {/* {member.profile.initials ? (
                          <img src={member.profile.avatar} width="100" />
                        ) : ( */}
                        <p className="c-A100">{member.profile.initials}</p>
                        {/* )} */}
                      </div>
                    ))}
                  </div>
                  <button
                    className={bg}
                    onClick={() => seeStoneDetails(stone._id)}
                  >
                    see more details
                  </button>
                  {openStoneCard === stone._id && (
                    <StoneCard
                      id={stone._id}
                      title={stone.title}
                      description={stone.description}
                      media={stone.media}
                      contentType={stone.contentType}
                      kind={stone.kind}
                      team={stone.team}
                      createdAt={stone.createdAt}
                      projectId={project._id}
                      projectTeam={project.team}
                    />
                  )}
                </div>
              );
            })}
          {/* <div className="chrono-icons" id="icons">
            {project?.stones.map((stone) => {
              return (
                (stone.kind === "flintstone" && (
                  <img src="" alt="" key={stone._id} />
                )) ||
                (stone.kind === "stepstone" && (
                  <img
                    src=""
                    alt=""
                    key={stone._id}
                  />
                )) ||
                (stone.kind === "milestone" && (
                  <img src="" alt="" key={stone._id} />
                )) ||
                (stone.kind === "endstone" && (
                  <img src="" alt="" key={stone._id} />
                ))
              );
            })}
          </div> */}
        </Chrono>

        <h1>Project Team</h1>
        {project.team.map((member) => (
          <TalentCard key={member._id} talent={member} user={user} />
        ))}

        <Footer />
      </div>
    )
  );
};

export default ProjectDetails;
