import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from "../elements/Footer.jsx";

// ICONS
import { BiCheck } from "react-icons/bi";
import { SlTrash } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";

// CONTEXT
import UserContext from "../../context/userContext.jsx";

// ELEMENTS
import { TalentCard } from "../elements/TalentCard.jsx";

const CreateStone = ({}) => {
  const [user, setUser] = useContext(UserContext);
  const [newStone, setNewStone] = useState({});
  const [project, setProject] = useState({});
  const [isPending, setPending] = useState(true);
  const { projectId } = useParams("projectId");
  const [contributor, setContributor] = useState(false);

  useEffect(() => {
    setPending(true);
    const fetchProject = async () => {
      fetch(`${host}/projects/63e6044cb86f5f75a82e8de3`, {
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
  }, []);

  // console.log("project", project, "and contr:", project.team);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    theme: "dark",
  };
  const handleInput = (e) => {
    setNewStone({ ...newStone, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {};
  const handleMedia = () => {};
  const handleToggle = () => {
    setContributor(!contributor);
  };
  return (
    <>
      <h1 className="central c-FAV mt1 mb2">new stone</h1>

      <form onSubmit={handleSubmit}>
        <div className="central col pa1 mb2">
          <div className="col">
            <p>
              title <span className="c-FAV">*</span>
            </p>
            <input
              type="text"
              name="title"
              placeholder="stone's title"
              required
              onChange={handleInput}
            />
          </div>
          <div className="col">
            <p>description</p>
            <input
              type="text"
              name="description"
              placeholder="stone description"
              onChange={handleInput}
            />
          </div>
          <div>
            <input
              type="radio"
              name="kind"
              value="stepstone"
              onChange={handleInput}
            />
            <label>stepstone</label>
            <input
              type="radio"
              name="kind"
              value="milestone"
              onChange={handleInput}
            />
            <label>milestone</label>
            <input
              type="radio"
              name="kind"
              value="endstone"
              onChange={handleInput}
            />
            <label>endstone</label>
          </div>
          <div>
            <hr width="500rem" />
          </div>{" "}
          <div>
            <div className="col">
              <p> add media</p>
              <label htmlFor="media-pic">add photos</label>
              <input
                type="file"
                multiple
                id="media-pic"
                onchange={handleMedia}
              />
              <label htmlFor="media-vid">add videos</label>
              <input
                type="file"
                multiple
                id="media-vid"
                onchange={handleMedia}
              />
            </div>
          </div>
          <div>
            <hr width="500rem" />
          </div>
          <div className="col">
            <p>contributors</p>
            <div className=" card col">
              {project.team?.length ? (
                project.team.map((talent) => {
                  return (
                    <>
                      <div className="t-avatar">
                        <div
                          className="bg-FAV central t-pic"
                          onClick={() => navigate(`/userDetails/${talent._id}`)}
                        >
                          {talent?.profile?.avatar ? (
                            <img src={talent.profile?.avatar} />
                          ) : (
                            <p className="initials">
                              {talent.profile?.initials}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="t-info">
                        <p
                          className="fw500 c-FAV"
                          onClick={() => navigate(`/userDetails/${talent._id}`)}
                        >
                          {talent.profile?.firstName} {talent.profile?.lastName}
                        </p>
                        <p>{talent.profile?.position}</p>
                        <p>{talent.profile?.toolsAndSkills}</p>
                      </div>

                      <label class="switch">
                        <input type="checkbox" />
                        <span class="slider round"></span>
                      </label>
                    </>
                  );
                })
              ) : (
                <p>no contributors</p>
              )}
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CreateStone;
