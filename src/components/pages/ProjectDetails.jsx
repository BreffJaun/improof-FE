// STYLE
import "../../styles/project-details.scss";
import "../../styles/chrono.scss";


import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Chrono } from "react-chrono";
import { host } from "../../api/host.jsx";
import ReactPlayer from "react-player";

//CONTEXT
import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";

//ELEMENTS
import { TalentCard, TalentCardContact } from "../elements/TalentCard.jsx";
import Footer from "../elements/Footer.jsx";
import StoneCard from "../elements/StoneCard.jsx";

// ICONS
import { GiPartyPopper as MileStone } from "react-icons/gi"
import { AiOutlineEdit as Edit } from "react-icons/ai";
import { AiOutlinePlus as Plus } from "react-icons/ai";
import ProjectBtn from "../buttons/ProjectBtn.jsx";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const [project, setProject] = useState({});
  const [isPending, setPending] = useState(true);
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const darkMode = user?.meta?.darkMode;
  const [openStoneCard, setOpenStoneCard] = useState();
  const [stone, setStone] = useState({});
  const [theme, setTheme] = useState("");
  const [imageViewer, setImageViewer] = useState(false);
  const [stoneImage, setStoneImage] = useState("");

  const showImage = (stoneImg) => {
    setImageViewer(true);
    setStoneImage(stoneImg);
  }
  const width = window.innerWidth
  
  // const []
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
            darkMode ? setTheme("dark") : setTheme("light");
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
    if (openStoneCard === stoneId) {
      setOpenStoneCard("");
    } else {
      setOpenStoneCard(stoneId);
      setStone(project.stoneId);
    }
  };

  return (
    !isPending &&
    user && (
      <div className="absolute">
        {/* MARTIN STYLEN */}
        {imageViewer &&
        <div className="image-container-other shadow-xl" 
        onClick={() => setImageViewer(false)}>
          <img className="img-other" src={stoneImage} alt="stoneImage" />
        </div>
        }
        <div className="central col mb1">
          {project.thumbnail && (
            <img src={project.thumbnail} alt="Thumbnail" width="350"  onClick={() => showImage(project.thumbnail)}/>
          )}
          <h1 className={color}>"{project.name}"</h1>
          <h4 className={color}>{project.description}</h4>
          <ProjectBtn project={project} user={user}/>
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

        <div className="bo-DARK"></div>
        {project.team.find((member) => member._id === user._id) && (
          <div className="center mt4">
            <button
              className={`${bg} circle70 central`}
              onClick={() => navigate(`/createStone/${project._id}`)}
            >
              <Plus className="fs3" />
            </button>
            <h4 className={color}>create new stone</h4>
          </div>
        )}
        <Chrono
          mode= {width < 750 ? "VERTICAL" : "VERTICAL_ALTERNATING" }
          theme={{
            primary: darkMode ? "var(--A40)" : "var(--A40)",
            secondary: darkMode ? "transparent" : "transparent",
            cardBgColor: darkMode ? "var(--A15)" : "var(--A100)",
            cardForeColor: "black",
            titleColor: darkMode ? "#fff" : "#333",
            titleColorActive: "red",
          }}
        >
           {/* MARTIN STYLEN */}

          {!isPending &&
            project.stones
              .map((stone) => {
                return (
                  <div className="stone-card-container" key={stone._id}>
                    <div className="stone-card-media mb1">
                      {!stone.media ? null : stone.contentType.includes(
                          "image"
                        ) ? (
                        <img src={stone.media} 
                        onClick={() => showImage(stone.media)}/>
                        
                      ) : (
                        <ReactPlayer
                          url={stone.media}
                          playing={false}
                          controls={true}
                          light={false}
                          // playIcon={noch keine Ahnung}
                          volume={null}
                          muted={true}
                          width="100%"
                          height="100%"
                          pip={true}
                          stopOnUnmount={false}
                        />
                      )}
                    </div>
                    <p className="center">{stone.kind}</p>
                    <h2>"{stone.title}"</h2>
                    <p className="center">
                      <strong>
                        {" "}
                        {parseInt(stone.createdAt.slice(11, 13)) + 1}
                        {stone.createdAt.slice(13, 16)}
                      </strong>
                      {stone.createdAt.slice(8, 10) +
                        ". " +
                        stone.createdAt.slice(5, 7) +
                        ". " +
                        stone.createdAt.slice(0, 4)}
                    </p>
                    <button
                      className={`${bg} mt1`}
                      onClick={() => seeStoneDetails(stone._id)}
                    >
                      {openStoneCard === stone._id ? "close" : "read more"}
                    </button>
                    {openStoneCard === stone._id && (
                      <StoneCard
                        stone={stone}
                        project={project}
                        theme={theme}
                      />
                    )}
                  </div>
                );
              })
          }
          {/* <div className="chrono-icons" id="icons">
            {project?.stones.map((stone) => {
              return (
                (stone.kind === "stepstone" && (
                  <h1>
                    <div className="c-FAV">
                      <MileStone key={stone._id}/>
                    </div>
                  </h1>
                )) ||
                (stone.kind === "milestone" && (
                  <h1>
                    <div className="c-FAV">
                      <MileStone key={stone._id}/>
                    </div>
                  </h1>
                
                )) ||
                (stone.kind === "endstone" && (
                  <img src="" alt="" key={stone._id} />
                ))
              );
            })}
          </div> */}
        </Chrono>

        <div className="bo-DARK"></div>
        <div className="center mb2">
          <h4 className={color}>project members</h4>
          <div className="central mt2 g1">
            {project.team.map((member) => (
              <TalentCard
                key={member._id}
                talent={member}
                user={user}
                theme={theme}
              />
            ))}
          </div>
        </div>
        <Footer/>
      </div>
    )
  );
};

export default ProjectDetails;
