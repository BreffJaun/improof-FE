import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { host } from "../../api/host.jsx";

import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";

//BUTTONS
import { FollowBtn } from "../buttons/FollowBtn.jsx";
import { SendMessageBtn } from "../buttons/MessageBtn.jsx";
import { AiFillEdit } from "react-icons/ai";

//ELEMENTS
import { ProjectCard } from "../elements/ProjectCard.jsx";
import { TalentCard } from "../elements/TalentCard.jsx";
import Up from "../elements/Up.jsx";
import Footer from "../elements/Footer.jsx";
import UserEdit from "./UserEdit.jsx";

// STYLES
import "../../styles/toastify.scss";

// LOGOS
import logoPi from "../../images/improof_PI.png";
import logoBl from "../../images/improof_BL.png";
import logoPu from "../../images/improof_PU.png";
import logoOr from "../../images/improof_OR.png";
import logoLB from "../../images/improof_LB.png";
import logoDG from "../../images/improof_DG.png";
import logoGR from "../../images/improof_GR.png";
import logoLG from "../../images/improof_LG.png";

const TalentDetails = () => {
  const navigate = useNavigate();

  const { id } = useParams("id");
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const [talent, setTalent] = useState(undefined);
  const [isPending, setIsPending] = useState(true);

  const [showContact, setShowContact] = useState(false);
  const [showInfos, setShowInfos] = useState(false);
  const [theme, setTheme] = useState("");

  const color = talent?.meta?.colorTheme[0];
  const bg = talent?.meta?.colorTheme[1];
  const darkMode = user?.meta?.darkMode;
  const talentIsRecruiter = talent?.profile?.isRecruiter;

  useEffect(() => {
    setIsPending(true);
    const getUser = async () => {
      await fetch(`${host}/users/checklogin`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          setIsPending(false);
          if (json.status) {
            setUser(json.user);
            darkMode ? setTheme("dark") : setTheme("light");
            setIsPending(false);
          } else {
            navigate("/login");
          }
        });
    };
    getUser();
  }, [trigger]);

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setIsPending(true);
    const getUser = async () => {
      await fetch(`${host}/users/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setTalent(json.userData);
            setIsPending(false);
          }
        });
    };
    getUser();
  }, [id]);

  return (
    talent && (
      <>
        <div className="central col mt3">
          <div className="rel">
            <div className="circle90 central">
              {talent.profile.avatar ? (
                <div className="head90 shadow-s">
                  <img
                    src={
                      user._id === talent._id
                        ? user.profile.avatar
                        : talent.profile.avatar
                    }
                    className={`${bg} rel head-pic`}
                    alt="avatar"
                  />
                </div>
              ) : (
                <div className={`circle90 ${bg} central rel initials`}>
                  <p>{talent.profile.initials}</p>
                </div>
              )}
            </div>
            {user._id === talent._id ? (
              <div
                title="edit your profile"
                className={`circle40 ${bg} central editBtn`}
                onClick={() => navigate(`/useredit/${user._id}`)}
              >
                <p className="c-A100 central">
                  <AiFillEdit />
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
          <h1 className={`central ${color} mt05`}>
            {talent.profile.firstName} {talent.profile.lastName}
          </h1>
          {/* <p className="mt05 mb1">{talent.profile.description ? talent.profile.description : "You could add some info to your profile."}</p> */}
          {showInfos ? (
            <div className="max1300">
              <div className="col mt05 mb1 maxM">
                {/* ----------------------------------------------- */}
                {talent.profile.description && (
                  <div className="mb1">
                    <p className={color}>that´s me:</p>
                    <p>{talent.profile.description}</p>
                  </div>
                )}
                {/* ----------------------------------------------- */}
                {talent.profile.goal && (
                  <div className="mb1">
                    <p className={color}>tools and skills:</p>
                    <p>{talent.profile.goal}</p>
                  </div>
                )}
                {/* ----------------------------------------------- */}
                {talent.profile.position && (
                  <div className="mb1">
                    <p className={color}>current occupation:</p>
                    <p>{talent.profile.position}</p>
                  </div>
                )}
                {/* ----------------------------------------------- */}
                {talent.profile.category && (
                  <div className="mb1">
                    <p className={color}>here i perform my best: </p>
                    <p>{talent.profile.category}</p>
                  </div>
                )}
                {/* ----------------------------------------------- */}
                {talent.profile.toolsAndSkills && (
                  <div className="mb1">
                    <p className={color}>tools and skills: </p>
                    <p>{talent.profile.toolsAndSkills}</p>
                  </div>
                )}
                {/* ----------------------------------------------- */}
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="mt1 central">
            <div>
              <button
                className={`${bg}`}
                onClick={() => setShowInfos(!showInfos)}
              >
                {showInfos ? "close" : "read more"}
              </button>
            </div>
            <div>
              {user?._id !== talent._id && (
                <FollowBtn talent={talent} user={user} />
              )}
            </div>
            <div>
              {user._id !== talent._id && (
                <SendMessageBtn talent={talent} user={user} />
              )}
            </div>
          </div>
        </div>

        {talentIsRecruiter ? (
          <div className="central col">
            <h1 className={color}>my favorite projects</h1>
            <p className={`${color} mb2`}>({talent.starProjects.length})</p>
            <div className="projects-container g1">
              {talent.starProjects.length ? (
                talent.starProjects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    user={user}
                    darkMode={darkMode}
                  />
                ))
              ) : (
                <p>It is time to discover some projects</p>
              )}
            </div>
          </div>
        ) : (
          <div className="central col">
            <h1 className={color}>projects</h1>
            <p className={`${color} mb2`}>({talent.myProjects.length})</p>
            <div className="projects-container g1">
              {talent.myProjects.length ? (
                talent.myProjects.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    user={user}
                    darkMode={darkMode}
                  />
                ))
              ) : (
                <p>It is time for your first project.</p>
              )}
            </div>
          </div>
        )}

        <div className="bo-DARK"></div>
        <div className="central col">
          <h1 className={`central ${color}`}>following</h1>
          <p className={`central ${color} mb2`}>({talent.follows.length})</p>
          <div className="projects-container g1">
            {talent.follows.length ? (
              talent.follows.map(
                (follow) =>
                  follow._id !== user._id && (
                    <TalentCard key={follow._id} talent={follow} user={user} />
                  )
              )
            ) : (
              <p>
                {talent.profile.firstName} {talent.profile.lastName} is not
                following anybody!
              </p>
            )}
          </div>
        </div>
        <div className="bo-DARK"></div>
        <div className="central col">
          <h1 className={`${color} mb1`}>contact</h1>
          {showContact ? (
            <div className="col mb1">
              {/* ----------------------------------------------- */}
              {talent.contact.mobile && (
                <div className="mb1">
                  <p className={color}>mobile</p>
                  <p>{talent.contact.mobile}</p>
                </div>
              )}
              {/* ----------------------------------------------- */}
              {talent.contact.website && (
                <div className="mb1">
                  <p className={color}>website</p>
                  <p>{talent.contact.website}</p>
                </div>
              )}
              {/* ----------------------------------------------- */}
              {talent.contact.online1 && (
                <div className="mb1">
                  <p className={color}>online profile #1</p>
                  <p>{talent.contact.online1}</p>
                </div>
              )}
              {/* ----------------------------------------------- */}
              {talent.contact.online2 && (
                <div className="mb1">
                  <p className={color}>online profile #2</p>
                  <p>{talent.contact.online2}</p>
                </div>
              )}
              {/* ----------------------------------------------- */}
              {talent.contact.online3 && (
                <div className="mb1">
                  <p className={color}>online profile #3</p>
                  <p>{talent.contact.online3}</p>
                </div>
              )}
              {/* ----------------------------------------------- */}
              {talent.contact.company && (
                <div className="mb1">
                  <p className={color}>company</p>
                  <p>{talent.contact.company}</p>
                </div>
              )}
              {/* ----------------------------------------------- */}
              {talent.location.city && (
                <div className="mb1">
                  <p className={color}>city</p>
                  <p>{talent.location.city}</p>
                </div>
              )}
              {/* ----------------------------------------------- */}
            </div>
          ) : (
            ""
          )}
          <button className={bg} onClick={() => setShowContact(!showContact)}>
            {showContact ? "close" : "show me"}
          </button>
        </div>
        {/* <ToastContainer limit={1} /> */}
      </>
    )
  );
};

export default TalentDetails;
