import { useState, useEffect, useContext, React } from "react";
import ReactPlayer from "react-player";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";

// CONTEXT
import UserContext from "../../context/userContext.jsx";

// ICONS
import { AiOutlineCamera as Camera } from "react-icons/ai";

// LOGOS
import logoPi from "../../images/improof_PI.png";
import logoBl from "../../images/improof_BL.png";
import logoPu from "../../images/improof_PU.png";
import logoOr from "../../images/improof_OR.png";
import logoLB from "../../images/improof_LB.png";
import logoDG from "../../images/improof_DG.png";
import logoGR from "../../images/improof_GR.png";
import logoLG from "../../images/improof_LG.png";

// ELEMENTS
import { host } from "../../api/host.jsx";
import Footer from "../elements/Footer.jsx";
import { TalentCardStones } from "../elements/TalentCard.jsx";

// STYLES
import "../../styles/toastify.scss";

const CreateStone = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [project, setProject] = useState({});
  const [isPending, setPending] = useState(true);
  const { projectId } = useParams("projectId");
  const initial = { userId: user._id, projectId: projectId };
  const [newStone, setNewStone] = useState(initial);
  const [contributors, setContributors] = useState([]);
  const [media, setMedia] = useState(undefined);
  const [mediaUrl, setMediaUrl] = useState("");
  const [createStonePending, setCreateStonePending] = useState(false);
  const [imageTrigger, setImageTrigger] = useState(false);
  const [videoTrigger, setVideoTrigger] = useState(false);
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const darkMode = user.meta.darkMode;
  const [theme, setTheme] = useState("");

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
            darkMode ? setTheme("dark") : setTheme("light");
            setPending(false);
          }
        });
    };
    fetchProject();
  }, []);

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

  const handleInput = (e) => {
    setNewStone({ ...newStone, [e.target.name]: e.target.value });
  };

  // HANDLING MEDIA FILES START //
  const handleImages = (event) => {
    if (event.target.files[0]?.size > 8000000) {
      document.getElementById("media-pic").value = "";
      toast.error(
        "Upload failed! Max file size for images is 8MB",
        toastOptions
      );
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
      toast.error(
        "Upload failed! Max file size for videos is 10MB",
        toastOptions
      );
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
    setNewStone({ ...newStone, team: contributors });
  }, [contributors]);

  // console.log("newStone: ", newStone.team?.length);
  const handleSubmit = async (e) => {
    const allowed = [
      "jpeg",
      "jpg",
      "png",
      "gif",
      "tiff",
      "bmp",
      "mp4",
      "mov",
      "wmv",
      "avi",
      "mkv",
      "flv",
    ];
    const avatarFormat = media?.name?.split(".")[1];
    e.preventDefault();
    if (media && !allowed.includes(avatarFormat)) {
      toast.info(
        "please choose a image in one of the following formats: jpeg, jpg, png, gif, tiff, bmp",
        toastOptions
      );
    } else {
      if (newStone.team.length !== 0) {
        const formData = new FormData();
        formData.append("media", media);
        formData.append("data", JSON.stringify(newStone));

        await fetch(`${host}/stones`, {
          credentials: "include",
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            if (!json.status) {
              toast.error(json.error, toastOptions);
            } else {
              toast("You just added a new stone", toastOptions);
              // setCreateStonePending(true);
              navigate(`/projectdetails/${projectId}`);
            }
          });
      } else {
        toast.info("please add a contributor");
      }
    }
  };

  return createStonePending ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1 className={`central ${color} mt1 mb2`}>new stone</h1>

      <form onSubmit={handleSubmit}>
        <div className="central col pa1 mb2">
          <div className="col maxM">
            <p className="ml1 mb05">
              title <span className={color}>*</span>
            </p>
            <input
              type="text"
              name="title"
              placeholder="stone's title"
              required
              onChange={handleInput}
              className="shadow-s"
            />
          </div>
          <div className="col maxM">
            <p className="ml1 mb05">description</p>
            <textarea
              id="description"
              rows="7"
              type="text"
              name="description"
              placeholder="stone description"
              onChange={handleInput}
              className="shadow-s"
            />
          </div>

          <div className="maxM mt2 bo-top-DARK"></div>
          <div className="row g2">
            <div className="g05 mb1 center">
              <input
                type="radio"
                name="kind"
                value="stepstone"
                onChange={handleInput}
              />
              <label>stepstone</label>
            </div>
            <div className="g05 mb1 center">
              <input
                type="radio"
                name="kind"
                value="milestone"
                onChange={handleInput}
              />
              <label>milestone</label>
            </div>
            <div className="g05 center">
              <input
                type="radio"
                name="kind"
                value="endstone"
                onChange={handleInput}
              />
              <label>endstone</label>
            </div>
          </div>

          <div className="maxM mt1 bo-top-DARK"></div>

          <div className="col maxM ">
            <h3 className={`fw500 ${color} center mb2`}>add your media</h3>
            <div className={mediaUrl ? "central" : "thumbnailS central"}>
              {mediaUrl && videoTrigger ? (
                <ReactPlayer
                  url={mediaUrl}
                  playing={true}
                  controls={true}
                  light={true} // for video thumbnail
                  // playIcon={martinsPlayIcon}
                  volume={null}
                  muted={true}
                  // width={"640px"}
                  // height={"360px"}
                  pip={true}
                  stopOnUnmount={false}
                />
              ) : mediaUrl && imageTrigger ? (
                <img className="central w100d" src={mediaUrl} alt="media" />
              ) : (
                <div title="upload"></div>
              )}
            </div>
            <div className="flex">
              <div className="col">
                <div className="upload">
                  <label for="media-pic">
                    <Camera className="fs2 mt1 pointer" />
                    photos
                  </label>
                  <input
                    type="file"
                    className="dis-none"
                    multiple
                    id="media-pic"
                    onChange={handleImages}
                    accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
                    disabled={videoTrigger}
                    hidden
                  />
                </div>
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
              <div className="col">
                <label for="media-vid">
                  <Camera className="fs2 mt1 pointer" />
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
              </div>
            </div>
          </div>

          <div className="maxM mt2 bo-top-DARK"></div>
          <div className="col">
            <h3 className={`fw500 ${color} center mb2`}>contributors</h3>

            {project.team?.length &&
              project.team.map((talent) => {
                return (
                  <TalentCardStones
                    key={talent._id}
                    user={user}
                    talent={talent}
                    contributors={contributors}
                    handleContributor={handleContributor}
                  />
                );
              })}
          </div>
        </div>

        <div className="maxM mt2 bo-top-DARK"></div>
        <button
          className={`${bg} mt3 central`}
          type="submit"
          onClick={() => handleSubmit}
        >
          add stone
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default CreateStone;
