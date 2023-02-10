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
import { TalentCard } from "../elements/TalentCard.jsx";

// ICONS
import { AiOutlineCamera as Camera} from "react-icons/ai"

const CreateProject = () => {
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

    // appenden das thumbnail ans newProject
    const formData = new FormData()
    formData.append("thumbnail", thumbnail)
    formData.append("data", JSON.stringify(newProject))

    // senden das Paket thumbnail+newProject
    const sendProjectData = async () => {
      await fetch(`${host}/projects/add`, {
        method: 'POST',
        body: JSON.stringify(formData),
        // headers: {
        //   'Content-type': 'application/json; charset=UTF-8',
        // },
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

    return (
      <>
        <h1 className="central c-FAV mt1 mb2">new project</h1>

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
              <p >thumbnail</p>
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
              <p>colorize your project</p>
              <RadioProjectColor setProjectColor={setProjectColor} />
            </div>

            <div className="col">
              <p>What is the topic?<span className="c-FAV">*</span></p>
              <CategoriesFilter setCategory={setCategory}/>
            </div>
          </div>

          <div className="bo-DARK"></div>
          <h1 className="central c-FAV mb2">create your team</h1>
          <h1>i know these talents</h1>
          <button className="circle30 bg-FAV c-A100 w700">+</button>
          {user.follows.map((talent) => {
            return (
              <TalentCard talent={talent} user={user} key={talent._id} />
            )
          })}

          <div className="bo-DARK"></div>
          <h1>i want these talents</h1>

          <div className="bo-DARK"></div>
          <RadioPrivacy setPrivacy={setPrivacy} />
          <button className="circle30 bg-FAV c-A100 w700">+</button>
          {/* {talents.filter((talent)=> talent._id !== user.follows._id).map((talent) => {
            return (
              <TalentCard talent={talent} user={user} key={talent._id} />
            )
          })} */}


          <div className="col">
            <div className="bo-DARK col"></div>
            <button type="submit" className="bg-FAV">create your project!</button>
          </div>

        </form>
        <ToastContainer />
        <Footer />
      </>
    );
  };

export default CreateProject;