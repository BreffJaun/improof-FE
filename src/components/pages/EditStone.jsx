import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../elements/Footer.jsx";

// CONTEXT
import UserContext from "../../context/userContext.jsx";

// ELEMENTS
import { TalentCard } from "../elements/TalentCard.jsx";
import Switch from "react-switch";

const EditStone = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [editedStone, setEditedStone] = useState({});
  const [stone, setStone] = useState({});
  const [isPending, setPending] = useState(true);
  const { stoneId } = useParams("stoneId");
  const [contributors, setContributors] = useState([]);
  const { projectId } = useParams("projectId");
  const [project, setProject] = useState({});
  const color = user.meta.colorTheme[0];

  useEffect(() => {
    setPending(true);
    const fetchStone = async () => {
      fetch(`${host}/stones/${stoneId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.status) {
            setStone(json.data);
            const newCon = json.data.team.map((con) => con._id);
            setContributors(newCon);
            setPending(false);
          }
        });
    };
    const fetchProject = () => {
      fetch(`${host}/projects/${projectId}`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.status) {
            setProject(json.data);
            setPending(false);
          }
        });
    };
    fetchStone();
    fetchProject();
  }, [editedStone]);

  console.log(stone);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    theme: "dark",
  };
  const handleInput = (e) => {
    setEditedStone({ ...editedStone, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${host}/stones/${projectId}/${stoneId}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...editedStone,
        userId: user._id,
        projectId: projectId,
        team: contributors,
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
          toast.info("You just edited a stone", toastOptions);
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
      <h1 className={`central ${color} mt1 mb2`}>edit stone</h1>

      <form onSubmit={handleSubmit}>
        <div className="central col pa1 mb2">
          <div className="col">
            <p>
              title <span className={color}>*</span>
            </p>
            <input
              type="text"
              name="title"
              defaultValue={stone.title}
              required
              onChange={handleInput}
            />
          </div>
          <div className="col">
            <p>description</p>
            <input
              type="text"
              name="description"
              defaultValue={stone.description}
              onChange={handleInput}
            />
          </div>
          <div>
            <input
              type="radio"
              name="kind"
              value="stepstone"
              defaultChecked={stone.kind === "stepstone" ? "on" : null}
              onChange={handleInput}
            />
            <label>stepstone</label>
            <input
              type="radio"
              name="kind"
              value="milestone"
              defaultChecked={stone.kind === "milestone" ? "on" : null}
              onChange={handleInput}
            />
            <label>milestone</label>
            <input
              type="radio"
              name="kind"
              value="endstone"
              defaultChecked={stone.kind === "endstone" ? "on" : null}
              onChange={handleInput}
            />
            <label>endstone</label>
          </div>
          <div>
            <hr width="500rem" />
          </div>
          <div>
            <div className="col">
              <p> add media</p>
              <label htmlFor="media-pic">add photos</label>
              <input
                type="file"
                multiple
                id="media-pic"
                onChange={handleMedia}
              />
              <label htmlFor="media-vid">add videos</label>
              <input
                type="file"
                multiple
                id="media-vid"
                onChange={handleMedia}
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
                          className={`fw500 ${color}`}
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
          edit stone
        </button>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default EditStone;
