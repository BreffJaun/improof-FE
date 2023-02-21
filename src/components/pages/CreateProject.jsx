import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../context/userContext.jsx";

// COMPONENTS
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import RadioPrivacy from "../buttons/RadioPrivacy"
import Footer from "../elements/Footer.jsx";
import { RadioColor } from "../buttons/RadioColor.jsx";
import { TalentToProjectCard } from "../elements/TalentToProjectCard.jsx";

// ICONS
import { AiOutlineCamera as Camera } from "react-icons/ai"
import { RiMailAddLine as MailPlus } from "react-icons/ri"
import { RiMailCloseLine as MailMinus } from "react-icons/ri"
import { FiUpload as Upload } from "react-icons/fi"


const CreateProject = () => {
  const [eMailFields, setEmailFields] = useState([1]);
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [user, setUser] = useContext(UserContext)
  const initial = {userId: user._id}
  const [thumbnail, setThumbnail] = useState(undefined)
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  // const [projectColor, setProjectColor] = useState("orange")
  const [category, setCategory] = useState(undefined)
  const [privacy, setPrivacy] = useState(false)
  const [newProject, setNewProject] = useState(initial)
  const [talents, setTalents] = useState([])
  const [favColor, setFavColor] = useState("")
  const [isPending, setPending] = useState(false)
  const [createProjectPending, setCreateProjectPending] = useState(false);
  const [team, setTeam] = useState([])
  const [inviteEmail, setInviteEmail] = useState([]);
  const follows = user.follows;
  const [addUserToTeamTrigger, setAddUserToTeamTrigger] = useState(false);
  const color = user.meta.colorTheme[0]
  const bg = user.meta.colorTheme[1]
  // console.log("projectColor: ", projectColor)

  const noFollowsFilter = (arr1, arr2) => {
    let clean = [];
    clean = arr1.filter(el => {
      return !arr2.some(element => {
          return element._id === el._id;
      });
    });
    return clean;
  }
  const noFollows = noFollowsFilter(talents, follows)

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    theme: "dark",
  };

  useEffect( () => {
    setPending(true)
    const getUsers = async () => {
      fetch(`${host}/users`)
        .then((response) => response.json())
        .then((json) => {        
          const onlyTalents = json.filter(user => user.profile.isTalent)
          setTalents(onlyTalents)
          setPending(false)
        });
    }
    getUsers()
  },[])

  // INPUT HANDLER START //
  const handleInput = (event) => {
    setNewProject({ ...newProject, [event.target.name]: event.target.value });
  }

  const handleFile = (event) => {
    setThumbnail(event.target.files[0])
    const image = URL.createObjectURL(event.target.files[0])
    setThumbnailUrl(image);
  }

  // HANDLE THE AMOUNTS OF INVITE INPUT FIELDS START //
  const addEmailFields = (event) => {
    event.preventDefault();
    setEmailFields([...eMailFields, 1])
  }

  const subEmailFields = (event) => {
    event.preventDefault();
    setEmailFields([...eMailFields.slice(0,-1)])
  }
  // HANDLE THE AMOUNTS OF INVITE INPUT FIELDS END //

  const inviteInputHandler = (event) => {
    setInviteEmail({...inviteEmail, [event.target.name]: event.target.value})
  }
  // INPUT HANDLER END //

  // USE EFFECTS START //
  useEffect(() => {
    setNewProject({...newProject, color: favColor});
  }, [favColor])

  useEffect(() => {
    setNewProject({...newProject, category: category});
  }, [category])

  useEffect(() => {
    setNewProject({...newProject, team: team});
  }, [team])

  useEffect(() => {
    setTeam([...team, user._id])
    setNewProject({...newProject, team: team});
  }, [addUserToTeamTrigger])

  useEffect(() => {
    setNewProject({...newProject, inviteOthers: Object.values(inviteEmail)});
  }, [inviteEmail])

  useEffect(() => {
    setNewProject({...newProject, private: privacy});
  }, [privacy])

  // USE EFFECTS END //

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAddUserToTeamTrigger(true);

    // Add your own userId to the team, because your a member of the project too.
    console.log('Z 122, newProject: ', newProject)

    const formData = new FormData()
    formData.append('thumbnail', thumbnail)
    formData.append('data', JSON.stringify(newProject))


    const sendProjectData = async () => {
      setCreateProjectPending(true)
      await fetch(`${host}/projects/add`, 
      {
        credentials: "include",
        method: 'POST',
        body: formData,
        // body: JSON.stringify(newProject),
      })
        .then((json) => json.json())
        .then((data) => {
          if (data.status) {
            toast.info("Your project is save!", toastOptions);
            setAddUserToTeamTrigger(false);
            setCreateProjectPending(false);
            if(!createProjectPending) {
              navigate(`/projectdetails/${data.data._id}`)
            }
          } 
          if (data.error) {
            setCreateProjectPending(false);
            toast.error(data.error, toastOptions);            
          }
        });
    };
    sendProjectData();
  }

  return (
    < div className="max">
      <div className="mb2">
        <h1 className={`central ${color}`}>project setup</h1>
        <h4 className={`central ${color} mt05`}>It is time to amaze the world!</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="maxM mt2">
          <div className="col">
            <p className="mb05 central">name<span className={color}>*</span></p>
            <input
              type="text"
              name="name"
              placeholder="Give it a catchy name!"
              required
              maxLength={20}
              onChange={handleInput}
            />
          </div>
          <div className="col">
            <p className="mt15 mb05 central">description<span className={color}>*</span></p>
            <input
              type="text"
              name="description"
              placeholder="what is your project about?"
              required
              maxLength={150}
              onChange={handleInput}
            />
          </div>
          <div className="col">
            <p className="mt15 mb05 central">thumbnail</p>
            <div className="thumbnailS">
              {thumbnailUrl ?
                <img 
                  src={thumbnailUrl} 
                  alt="thumbnail"                 
                />
                : 
                null           
              }
              <div title="x upload">
                <Upload className="y"/>
                <input 
                  className="z"
                  type="file"
                  name="thumbnail"
                  onChange={handleFile}
                  accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
                />
                <label 
                  for="uploadAvatar"
                  className="c-A100 pointer"
                >
                  <AiOutlineCamera/>
                </label>
              </div>
            </div>
          </div>
          <div className="col central">
            <p className="mt15 mb05">What is the topic?<span className={color}>*</span></p>
            <CategoriesFilter setCategory={setCategory}/>
          </div>
          <div className="col central">
            <p className="mt15 mb05">Pick a color!</p>
            <RadioColor user={user} setFavColor={setFavColor} /> 
          </div>
        </div>

    {/*  - - - - - FOLLOWING COMMUNITY - - - - - */}
        <div className="bo-DARK"></div>
        <h1 className={`central ${color}`}>team setup</h1>
        <h4 className={`center ${color} mb2`}>your star talents</h4>
        <div className="center maxM mt2">
          <div className="talent-container">
            {user.follows.length === 0 ?
            <p>get inspired by the community</p> : 
            user.follows.map(talent => 
              talent._id !== user._id &&
              <TalentToProjectCard 
                team={team} 
                setTeam={setTeam}
                key={talent._id}
                talent={talent}
                user={user} 
              />
            )}
          </div>
        </div>

        {/*  - - - - - COMMUNITY - - - - - */}
        <div className="mt3 central">
          <h4 className={`central ${color} mt05`}>add new talents</h4>
        </div>
        <div className="maxM mt2">
          <div className="talent-container">
            {noFollows && noFollows.map((talent) =>
            talent._id !== user._id &&
            <TalentToProjectCard 
              team={team} 
              setTeam={setTeam}
              key={talent._id}
              talent={talent}
              user={user} 
            />
          )}
          </div>
        </div>
        

        {/*  - - - - - INVITATION - - - - - */}
        <div className="bo-DARK"></div>
        <div className="mb1 mt3 central">
          <h4 className={`${color}`}>invite to improof</h4>
        </div>
        <div className="maxM mt2">
          <div className="col">
            {eMailFields.map((el, i) => 
            <input 
              type="email" 
              name={`inviteOthers${i}`}
              onChange={inviteInputHandler}
              placeholder="invite to improof"
              key={i}
            />           
            )} 
          </div>
          <div className="central mt2 flex g3">

            <div>
              <button 
                className={`mb05 rel ${bg} central circle40`}
                onClick={addEmailFields}
                disabled={eMailFields.length === 5}
              >{eMailFields.length === 5 ? "you can invite more people later in the project" :
              <div>
                <h2 className="central"><MailPlus /></h2>
              </div>}
              </button>
              <p>add an email</p>
            </div>

            <div>
              <button
                className={`mb05 rel ${bg} central circle40`}  
                onClick={subEmailFields}
                disabled={eMailFields.length === 1}
                ><h2 className="central"><MailMinus /></h2> 
                </button>
                <p>delete the mail</p>
              </div>
            </div>
          </div>


        <div className="bo-DARK"></div>
        <div className="col">
          <div className="mb1 central">
            <h4 className={`${color}`}>privacy</h4>
          </div>
          <div className="maxM">
            <RadioPrivacy setPrivacy={setPrivacy} />
          </div>
        </div>

        <div className="bo-DARK"></div>

        <div>
          <button
            className={`mb2 mt2 rel ${bg}`}
            type="submit">create your project!
          </button>
        </div>
      </form>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default CreateProject;