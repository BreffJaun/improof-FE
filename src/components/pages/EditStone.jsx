import { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import { host } from "../../api/host.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../elements/Footer.jsx";

// CONTEXT
import UserContext from "../../context/userContext.jsx";

// ICONS
import { AiOutlineCamera as Camera } from "react-icons/ai";
import { CgDanger as Danger } from "react-icons/cg";

// LOGOS
import logoPi from "../../images/improof_PI.png";
import logoBl from "../../images/improof_BL.png";
import logoPu from "../../images/improof_PU.png";
import logoOr from "../../images/improof_OR.png";
import logoLB from "../../images/improof_LB.png";
import logoDG from "../../images/improof_DG.png";
import logoGR from "../../images/improof_GR.png";
import logoLG from "../../images/improof_LG.png";

// STYLES
import "../../styles/toastify.scss";

// ELEMENTS
import { TalentCardStones } from "../elements/TalentCard.jsx";

const EditStone = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const userId = user._id;
  const { stoneId } = useParams("stoneId");
  const { projectId } = useParams("projectId");
  const [editedStone, setEditedStone] = useState({});
  const [stone, setStone] = useState({});
  const [isPending, setPending] = useState(true);
  const [contributors, setContributors] = useState([]);
  const [project, setProject] = useState({});
  const [media, setMedia] = useState(undefined);
  const [mediaUrl, setMediaUrl] = useState("");
  const [imageTrigger, setImageTrigger] = useState(false);
  const [videoTrigger, setVideoTrigger] = useState(false);
  const [editStonePending, setEditStonePending] = useState(false);
  const [adIdsTrigger, setIdsTrigger] = useState(false);
  const [thumbnail, setThumbnail] = useState("");
  const [theme, setTheme] = useState("");
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const darkMode = user.meta.darkMode;

  const toastOptions = {
    theme: theme,
    hideProgressBar: "true",
    icon: () => (
      <img
        src={
          color === "c-PI1"
            ? logoPi
            : color === "c-O2"
            ? logoOr
            : color === "c-PU1"
            ? logoPu
            : color === "c-B2"
            ? logoBl
            : color === "c-LB2"
            ? logoLB
            : color === "c-GR1"
            ? logoLG
            : color === "c-GR3"
            ? logoGR
            : logoDG
        }
        width="20"
      />
    ),
  };

  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setPending(true);
    const fetchStone = async () => {
      fetch(`${host}/stones/${stoneId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setStone(json.data);
            const newCon = json.data.team.map((con) => con._id);
            setContributors(newCon);
            darkMode ? setTheme("dark") : setTheme("light");
            setPending(false);
            console.log("STONE GEZOGEN");
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
            console.log("PROJECT GEZOGEN");
          }
        });
    };
    fetchStone();
    fetchProject();
  }, []); // warum auf editedStone?

  // console.log(stone);
  const handleInput = (e) => {
    setEditedStone({ ...editedStone, [e.target.name]: e.target.value });
  };

  // HANDLING MEDIA FILES START //
  const handleImages = (event) => {
    if (event.target.files[0]?.size > 8000000) {
      document.getElementById("media-pic").value = "";
      toast("Upload failed! Max file size for images is 8MB", toastOptions);
    }
    setImageTrigger(true);
    setMedia(event.target.files[0]);
    const media = URL.createObjectURL(event.target.files[0]);
    setMediaUrl(media);
  };

  const resetImageHandler = (event) => {
    event.preventDefault();
    document.getElementById("media-pic").value = "";
    setMedia(undefined);
    setMediaUrl(undefined);
    setImageTrigger(false);
  };

  const handleVideos = (event) => {
    // ca. 3min Video length => should be enough!
    if (event.target.files[0]?.size > 10000000) {
      document.getElementById("media-vid").value = "";
      toast("Upload failed! Max file size for videos is 10MB", toastOptions);
    } else {
      setVideoTrigger(true);
      setMedia(event.target.files[0]);
      const media = URL.createObjectURL(event.target.files[0]);
      setMediaUrl(media);
    }
  };

  const resetVideoHandler = (event) => {
    event.preventDefault();
    document.getElementById("media-vid").value = "";
    setMedia(undefined);
    setMediaUrl(undefined);
    setVideoTrigger(false);
  };

  // HANDLING MEDIA FILES END //

  const handleContributor = (contributor) => {
    if (contributors.includes(contributor)) {
      const newContributors = contributors.filter((con) => con !== contributor);
      setContributors(newContributors);
    } else {
      setContributors([...contributors, contributor]);
    }
  };

  useEffect(() => {
    setEditedStone({ ...editedStone, team: contributors });
  }, [contributors]);

  useEffect(() => {
    setEditedStone({
      ...editedStone,
      userId: userId,
      projectId: projectId,
      stoneId: stoneId,
    });
  }, [adIdsTrigger]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIdsTrigger(true);

    const allowed = ["jpeg", "jpg", "png", "gif", "tiff", "bmp", "mp4", "mov", "wmv", "avi", "mkv", "flv"]
    const avatarFormat = media?.name?.split(".")[1]
    if(media && !allowed.includes(avatarFormat)){
      toast.info("please choose a image in one of the following formats: jpeg, jpg, png, gif, tiff, bmp", toastOptions);
    } else{      
      const formData = new FormData();
      formData.append("media", media);
      formData.append("data", JSON.stringify(editedStone));
      
      setEditStonePending(true);
      await fetch(`${host}/stones/${stoneId}`, {
        credentials: "include",
        method: "PATCH",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.status) {
            toast(json.error, toastOptions);
            setEditStonePending(false);
          } else {
            toast("Your stone is updated", toastOptions);
            navigate(`/projectdetails/${projectId}`);
          }
        });
    }
  };

  const handleDelete = async () => {
    console.log(user._id, project._id, stone._id);

    await fetch(`${host}/stones/${stone._id}`, {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({
        userId: user._id,
        projectId: project._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => navigate(`/projectdetails/${projectId}`));
  };

  return editStonePending ? (
    <div>Loading...</div>
  ) : (
    <>
      <h1 className={`central ${color} mt1 mb2`}>edit stone</h1>
      <form onSubmit={handleSubmit}>
        <div className="maxM col mb2">
          <div className="col">
            <p className="ml1 mb05">
              title <span className={color}>*</span>
            </p>
            <input
              type="text"
              name="title"
              defaultValue={stone.title}
              required
              onChange={handleInput}
              className="shadow-s"
            />
          </div>
          <div className="col mt1">
            <p className="ml1 mb05">description</p>
            <textarea
              rows="7"
              type="text"
              name="description"
              defaultValue={stone.description}
              onChange={handleInput}
              className="shadow-s"
              id="description"
            />
          </div>
          <div className="central row mt4 mb2 g2">
            <div className="central col">
              <input
                type="radio"
                name="kind"
                value="stepstone"
                defaultChecked={stone.kind === "stepstone" ? "on" : null}
                onChange={handleInput}
              />
              <label>stepstone</label>
            </div>
            <div className="central col">
              <input
                type="radio"
                name="kind"
                value="milestone"
                defaultChecked={stone.kind === "milestone" ? "on" : null}
                onChange={handleInput}
              />
              <label>milestone</label>
            </div>
            <div className="central col">
              <input
                type="radio"
                name="kind"
                value="endstone"
                defaultChecked={stone.kind === "endstone" ? "on" : null}
                onChange={handleInput}
              />
              <label>endstone</label>
            </div>
          </div>
          <div>
            <div className="col">
              <p className="ml1 mb05">add media</p>
              {/* <div className="thumbnailS"> */}
              {mediaUrl && videoTrigger ? (
                <div>
                  <ReactPlayer
                    url={mediaUrl}
                    playing={false}
                    controls={true}
                    light={thumbnail}
                    // playIcon={noch keine Ahnung}
                    volume={null}
                    muted={true}
                    width="100%"
                    height="100%"
                    pip={true}
                    stopOnUnmount={false}
                  />
                </div>
              ) : mediaUrl && imageTrigger ? (
                <img src={mediaUrl} alt="media" />
              ) : (
                <div className="thumbnailS"></div>
              )}
              {/* </div> */}
              <div className="col">
                <label for="media-pic">
                  <Camera />
                  photos
                </label>
                <input
                  type="file"
                  multiple
                  id="media-pic"
                  onChange={handleImages}
                  accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
                  disabled={videoTrigger}
                  hidden
                />
              </div>
              <div className="col">
                <label for="media-vid">
                  <Camera />
                  videos
                </label>
                <input
                  type="file"
                  multiple
                  id="media-vid"
                  onChange={handleVideos}
                  accept=".mp4, .mov, .wmv, .avi, .mkv, .flv"
                  disabled={imageTrigger}
                  hidden
                />
                {videoTrigger && (
                  <button
                    className={bg}
                    type="button"
                    onClick={resetVideoHandler}
                  >
                    reset video selection
                  </button>
                )}
                {imageTrigger && (
                  <button
                    className={bg}
                    type="button"
                    onClick={resetImageHandler}
                  >
                    reset image selection
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col">
            <h3 className={`fw500 ${color} center mt2`}>contributors</h3>{" "}
            {project.team?.length &&
              project.team.map((talent) => {
                return (
                  <TalentCardStones
                    user={user}
                    talent={talent}
                    contributors={contributors}
                    handleContributor={handleContributor}
                  />
                );
              })}
          </div>
        </div>
        <div className="maxM mb2 central">
          <button type="submit" className={bg} onClick={() => handleSubmit}>
            save changes
          </button>
        </div>
      </form>
      <div className="bo-DARK"></div>
      <div className="flex center">
        <h1 className="c-alert">
          <Danger />
        </h1>
        <button className="dangerzone bg-alert" onClick={() => handleDelete()}>
          <p>delete stone?</p>
        </button>
      </div>
      <Footer />
    </>
  );
};

export default EditStone;
