import { useState, useEffect, useContext, React } from "react";
import ReactPlayer from 'react-player'
import { toast, ToastContainer } from "react-toastify";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";


// CONTEXT
import UserContext from "../../context/userContext.jsx";

// ICONS
import { AiOutlineCamera as Camera} from "react-icons/ai"

// ELEMENTS
import { host } from "../../api/host.jsx";
import Footer from "../elements/Footer.jsx";
import { TalentCard } from "../elements/TalentCard.jsx";

const CreateStone = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [project, setProject] = useState({});
  const [isPending, setPending] = useState(true);
  const { projectId } = useParams("projectId");
  const initial = {userId: user._id, projectId: projectId}
  const [newStone, setNewStone] = useState(initial);
  const [contributors, setContributors] = useState([]);
  const [media, setMedia] = useState(undefined)
  const [mediaUrl, setMediaUrl] = useState("");
  const [createStonePending, setCreateStonePending] = useState(false);
  const [imageTrigger, setImageTrigger] = useState (false)
  const [videoTrigger, setVideoTrigger] = useState (false)
  const color = user.meta.colorTheme[0]

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

  // HANDLING MEDIA FILES START //
  const handleImages = (event) => {
    if(event.target.files[0]?.size > 8000000) {
      document.getElementById('media-pic').value=''
      toast.error("Upload failed! Max file size for images is 8MB", toastOptions);
    }
    setImageTrigger(true)
    setMedia(event.target.files[0])
    const media = URL.createObjectURL(event.target.files[0])
    setMediaUrl(media);
  };

  const resetImageHandler = (event)=> {
    event.preventDefault();
    document.getElementById('media-pic').value=''
    setMedia(undefined)
    setMediaUrl(undefined)
    setImageTrigger(false)
  } 

  const handleVideos = (event) => {
    // ca. 3min Video length => should be enough!
    if(event.target.files[0]?.size > 10000000) {
      document.getElementById('media-vid').value=''
      toast.error("Upload failed! Max file size for videos is 10MB", toastOptions);
    } else {
      setVideoTrigger(true)
      setMedia(event.target.files[0])
      const media = URL.createObjectURL(event.target.files[0])
      setMediaUrl(media);
    }
  };
  
  const resetVideoHandler = (event)=> {
    event.preventDefault();
    document.getElementById('media-vid').value=''
    setMedia(undefined)
    setMediaUrl(undefined)
    setVideoTrigger(false)
  } 
  // HANDLING MEDIA FILES END //
  
  const handleContributor = (contributor) => {
    if (contributors.includes(contributor)) {
      const newContributors = contributors.filter((con) => con !== contributor);
      setContributors(newContributors);
    } else {
      setContributors([...contributors, contributor]);
    }
  };  
  
  useEffect (() => {
    setNewStone({ ...newStone, team: contributors })
  }, [contributors])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("newStone: ", newStone)

    const formData = new FormData()
    formData.append('media', media)
    formData.append('data', JSON.stringify(newStone))

    setCreateStonePending(true)
    await fetch(`${host}/stones`, 
    {
      credentials: "include",
      method: "POST",
      body: formData
    })
      .then((response) => response.json())
      .then((json) => {
        if (!json.status) {
          toast.error(json.error, toastOptions);
          setCreateStonePending(false)
        } else {
          // toast.info("You just added a new stone", toastOptions);
          navigate(`/projectdetails/${projectId}`);
        }
      });
  };

  

  return createStonePending ?  <div>Loading...</div> : (
    <>
      <h1 className={`central ${color} mt1 mb2`}>new stone</h1>

      <form onSubmit={handleSubmit}>
        <div className="central col pa1 mb2">
          <div className="col">
            <p>
              title <span className={color}>*</span>
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
              // talent
            />
            <label>endstone</label>
          </div>
          <div>
            <hr width="500rem" />
          </div>{" "}
          <div>
            <div className="col">
              <p> add media</p>
              <div className="thumbnailS">
                {
                  mediaUrl && videoTrigger
                  ?
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
                  : 
                  mediaUrl && imageTrigger 
                  ?
                  <img 
                    src={mediaUrl} 
                    alt="media"                 
                  />
                  : 
                  <div title="upload"><Camera /></div>
                }
              </div>
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
                {imageTrigger && <button type="button" onClick={resetImageHandler}>reset image selection</button>}                
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
                {videoTrigger && <button type="button" onClick={resetVideoHandler}>reset video selection</button>}
                
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
                      <div className="t-avatar" >
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
          add stone
        </button>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CreateStone;
