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
import { RadioProjectColor } from "../buttons/RadioColor.jsx";
import { TalentToProjectCard } from "../elements/TalentToProjectCard.jsx";

// ICONS
import { AiOutlineCamera as Camera} from "react-icons/ai"


const CreateProject = () => {
  const [eMailFields, setEmailFields] = useState([1]);
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [user, setUser] = useContext(UserContext)
  const initial = {userId: user._id}
  const [thumbnail, setThumbnail] = useState(undefined)
  const [projectColor, setProjectColor] = useState("orange")
  const [category, setCategory] = useState(undefined)
  const [privacy, setPrivacy] = useState(false)
  const [newProject, setNewProject] = useState(initial)
  const [talents, setTalents] = useState([])
  const [isPending, setPending] = useState(false)
  const [team, setTeam] = useState([])
  const follows = user.follows;

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

  console.log(typeof eMailFields);


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

  const handleInput = (event) => {
    setNewProject({ ...newProject, [event.target.name]: event.target.value });
  }
  const handleFile = (event) => {
    setThumbnail(event.target.files[0])
  }
  const handleEmails = (event) => {
    setEmailFields([...eMailFields, 1])
    console.log("eMailFields: ", eMailFields);
  }


  useEffect(() => {
    setNewProject({ ...newProject, color: projectColor });
  }, [projectColor])

  useEffect(() => {
    setNewProject({ ...newProject, category: category });
  }, [category])

  useEffect(() => {
    setNewProject({ ...newProject, private: privacy });
  }, [privacy])

  const handleSubmit = async (event) => {
    console.log(newProject);
    newProject.team=[user._id]
    event.preventDefault();

    const formData = new FormData()
    formData.append("thumbnail", thumbnail)
    formData.append("data", JSON.stringify(newProject))

    const sendProjectData = async () => {
      await fetch(`${host}/projects/add`, {
        method: 'POST',
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json)
          if (!json.status) {
            toast.error(json.error, toastOptions);
          } else {
            toast.info("Your project is save!", toastOptions);
          }
        });
    };
    sendProjectData();
  }

  console.log("team:", team);

  return (
    <>
      <div className="mt4 mb2">
        <h1 className="central c-FAV">new project</h1>
        <h4 className="central c-FAV mt05">It is time to amaze the world!</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="central col pa1 mb2">
          <div className="col">
            <p>project name<span className="c-FAV">*</span></p>
            <input
              type="text"
              name="name"
              placeholder="Give your project a catchy name!"
              required
              onChange={handleInput}
            />
          </div>

          <div className="col">
            <p>description<span className="c-FAV">*</span></p>
            <input
              type="text"
              name="description"
              placeholder="what is your project about?"
              required
              onChange={handleInput}
            />
          </div>

          <div className="col">
            <p>thumbnail</p>
            <div className="thumbnailS">
              <div title="upload"><Camera /></div>
            </div>
            <input
              type="file"
              name="thumbnail"
              onChange={handleFile}
            />
          </div>
          <div className="col">
            <p>What is the topic?<span className="c-FAV">*</span></p>
            <CategoriesFilter setCategory={setCategory}/>
          </div>
          <div className="col">
            <p>colorize your project</p>
            <RadioProjectColor setProjectColor={setProjectColor} />
          </div>
        </div>

    {/*  - - - - - FOLLOWING COMMUNITY - - - - - */}
    <div className="bo-DARK"></div>
    <h4 className="central c-FAV mt4 mb4">setup your team</h4>
    <div className="talent-container">
      {user.follows.length === 0 ?
      <p>get inspired by the community</p> : 
      user.follows.map(talent => 
        talent._id !== user._id &&
        <TalentToProjectCard team={team} setTeam={setTeam}
        key={talent._id}
        talent={talent}
        user={user} 
        />
      )}
    </div>


    {/*  - - - - - COMMUNITY - - - - - */}
    <div className="mb1 mt3 central">
        <h4 className="central c-FAV mt05">add new talents</h4>
      </div>
      <div className="talent-container">
          {noFollows && noFollows.map((talent) =>
          talent._id !== user._id &&
          <TalentToProjectCard team={team} setTeam={setTeam}
          key={talent._id}
          talent={talent}
          user={user} 
        />
      )}
      </div>
        

      {/*  - - - - - INVITATION - - - - - */}
      <div className="bo-DARK"></div>
      <div className="mb1 mt3 central">
        <h4 className="central c-FAV mt05">invite to improof</h4>
        </div>
        <div className="col">
          {eMailFields.map( el => <input type="text"/> )  } 
          
          <button onClick={handleEmails}>+ email</button>
        </div>


        
        <div className="bo-DARK"></div>
        <div className="col">
          <RadioPrivacy setPrivacy={setPrivacy}/>
          <button type="submit" className="mt2 bg-FAV">create your project!</button>
        </div>

      </form>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CreateProject;