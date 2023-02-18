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

// ELEMENTS
import { TalentCard } from "../elements/TalentCard.jsx";
import Switch from "react-switch";
import styledEngine from "@mui/styled-engine";

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
  const color = user.meta.colorTheme[0];
  // console.log("projectId: ", projectId)
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    theme: "dark",
  };
  console.log(stone);

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

  // console.log("projectId: ", projectId)
  // console.log("stoneId: ", stoneId)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIdsTrigger(true);
    console.log("editedStone: ", editedStone);
    console.log("stoneId: ", stoneId);

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
          // console.log("ICH HÄNGE IM IF");
          toast.error(json.error, toastOptions);
          setEditStonePending(false);
        } else {
          // console.log("ICH HÄNGE IM ELSE");
          navigate(`/projectdetails/${projectId}`);
        }
      });
  };

  return editStonePending ? <div>Loading...</div> : (
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
                      width='100%'
                      height='100%'
                      pip={true}
                      stopOnUnmount={false}
                    />
                    
                  </div>
                ) : mediaUrl && imageTrigger ? (
                  <img src={mediaUrl} alt="media" />
                ) : (
                  <div className="thumbnailS">
                    <Camera />
                  </div>
                )}
              {/* </div> */}
              <div className="col">
                <label htmlFor="media-pic">photos</label>
                <input
                  type="file"
                  multiple
                  id="media-pic"
                  onChange={handleImages}
                  accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
                  disabled={videoTrigger}
                />
                {imageTrigger && (
                  <button type="button" onClick={resetImageHandler}>
                    reset image selection
                  </button>
                )}
              </div>
              <div className="col">
                <label htmlFor="media-vid">videos</label>
                <input
                  type="file"
                  multiple
                  id="media-vid"
                  onChange={handleVideos}
                  accept=".mp4, .mov, .wmv, .avi, .mkv, .flv"
                  disabled={imageTrigger}
                />
                {videoTrigger && (
                  <button type="button" onClick={resetVideoHandler}>
                    reset video selection
                  </button>
                )}
              </div>
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
                    <div key={talent._id}>
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
                    </div>
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
