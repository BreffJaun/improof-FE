import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Footer from "../elements/Footer.jsx";

// CONTEXT
import UserContext from "../../context/userContext.jsx";

// ELEMENTS
import { TalentCard } from "../elements/TalentCard.jsx";
import Switch from "react-switch";

const CreateStone = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [newStone, setNewStone] = useState({});
  const [project, setProject] = useState({});
  const [isPending, setPending] = useState(true);
  const { projectId } = useParams("projectId");
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    setPending(true);
    const fetchProject = async () => {
      fetch(`${host}/projects/${projectId}`, {
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
  }, [contributors]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    theme: "dark",
  };
  const handleInput = (e) => {
    setNewStone({ ...newStone, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${host}/stones`, {
      method: "POST",
      body: JSON.stringify({
        ...newStone,
        userId: user._id,
        projectId: projectId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (!json.status) {
          toast.error(json.error, toastOptions);
        } else {
          toast.info("You just added a new stone", toastOptions);
        }
      });
    navigate(`/projectdetails/${projectId}`);
  };
  const handleMedia = () => {};
  const handleContributor = (contributor) => {
    if (contributors.includes(contributor)) {
      const newContributors = contributors.filter((con) => con !== contributor);
      setContributors(newContributors);
    } else {
      setContributors([...contributors, contributor]);
    }
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
              talent
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
              {project.team?.length &&
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
                        <Switch
                          checked={contributors.includes(talent._id)}
                          onChange={() => handleContributor(talent._id)}
                          onColor="#86d3ff"
                          onHandleColor="#2693e6"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                          height={20}
                          width={48}
                          className="react-switch"
                          id="material-switch"
                        />
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
        <button type="submit" onClick={() => handleSubmit}>
          add stone
        </button>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CreateStone;
