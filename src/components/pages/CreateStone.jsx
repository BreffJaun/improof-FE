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
  const handleInput = () => {};
  const handleSubmit = () => {};
  const handleMedia = () => {};
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
              name="stoneType"
              value="stepstone"
              onChange={handleInput}
            />
            <label htmlFor="stoneType">stepstone</label>
            <input type="radio" name="stoneType" value="milestone" />
            <label htmlFor="stoneType">milestone</label>
            <input type="radio" name="stoneType" value="endstone" />
            <label htmlFor="stoneType">endstone</label>
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
            {project.team?.length ? (
              project.team.map((talent) => {
                return (
                  <>
                    <div className="project card col">
                      <TalentCard talent={talent} user={user} />
                    </div>
                  </>
                );
              })
            ) : (
              <p>no contributors</p>
            )}
          </div>
        </div>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CreateStone;
