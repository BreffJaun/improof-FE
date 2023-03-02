import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../context/userContext.jsx";
import "../../styles/create-project.scss";

// COMPONENTS
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import RadioPrivacy from "../buttons/RadioPrivacy";
import Footer from "../elements/Footer.jsx";
import { RadioColor } from "../buttons/RadioColor.jsx";
import { TalentToProjectCard } from "../elements/TalentToProjectCard.jsx";

// ICONS
import { AiOutlineCamera as Camera } from "react-icons/ai";
import { RiMailAddLine as MailPlus } from "react-icons/ri";
import { RiMailCloseLine as MailMinus } from "react-icons/ri";
import { FiUpload as Upload } from "react-icons/fi";

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

const CreateProject = () => {
  const [eMailFields, setEmailFields] = useState([1]);
  const navigate = useNavigate();
  const { id } = useParams("id");
  const [user, setUser] = useContext(UserContext);
  const initial = { userId: user._id };
  const [thumbnail, setThumbnail] = useState(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  // const [projectColor, setProjectColor] = useState("orange")
  const [category, setCategory] = useState(undefined);
  const [privacy, setPrivacy] = useState(false);
  const [newProject, setNewProject] = useState(initial);
  const [talents, setTalents] = useState([]);
  const [favColor, setFavColor] = useState("");
  const [isPending, setPending] = useState(false);
  const [createProjectPending, setCreateProjectPending] = useState(false);
  const [team, setTeam] = useState([]);
  const [inviteEmail, setInviteEmail] = useState([]);
  const follows = user.follows;
  const [addUserToTeamTrigger, setAddUserToTeamTrigger] = useState(false);
  const [search, setSearch] = useState("");
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const darkMode = user.meta.darkMode;
  const [theme, setTheme] = useState("");

  const noFollowsFilter = (arr1, arr2) => {
    let clean = [];
    clean = arr1.filter((el) => {
      return !arr2.some((element) => {
        return element._id === el._id;
      });
    });
    return clean;
  };
  const noFollows = noFollowsFilter(talents, follows);

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
    setPending(true);
    const getUsers = async () => {
      fetch(`${host}/users`)
        .then((response) => response.json())
        .then((json) => {
          const onlyTalents = json.filter((user) => user.profile.isTalent);
          setTalents(onlyTalents);
          darkMode ? setTheme("dark") : setTheme("light");
          setPending(false);
        });
    };
    getUsers();
  }, []);

  // INPUT HANDLER START //
  const handleInput = (event) => {
    setNewProject({ ...newProject, [event.target.name]: event.target.value });
  };

  const handleFile = (event) => {
    setThumbnail(event.target.files[0]);
    const image = URL.createObjectURL(event.target.files[0]);
    setThumbnailUrl(image);
  };

  // HANDLE THE AMOUNTS OF INVITE INPUT FIELDS START //
  const addEmailFields = (event) => {
    event.preventDefault();
    setEmailFields([...eMailFields, 1]);
  };

  const subEmailFields = (event) => {
    event.preventDefault();
    setEmailFields([...eMailFields.slice(0, -1)]);
  };
  // HANDLE THE AMOUNTS OF INVITE INPUT FIELDS END //

  const inviteInputHandler = (event) => {
    setInviteEmail({ ...inviteEmail, [event.target.name]: event.target.value });
  };
  // INPUT HANDLER END //

  // USE EFFECTS START //
  useEffect(() => {
    setNewProject({ ...newProject, color: favColor });
  }, [favColor]);

  useEffect(() => {
    setNewProject({ ...newProject, category: category });
  }, [category]);

  useEffect(() => {
    setSearch("");
    setNewProject({ ...newProject, team: team });
  }, [team]);

  useEffect(() => {
    setTeam([...team]);
    setNewProject({ ...newProject, team: team });
  }, [addUserToTeamTrigger]);

  useEffect(() => {
    setNewProject({ ...newProject, inviteOthers: Object.values(inviteEmail) });
  }, [inviteEmail]);

  useEffect(() => {
    setNewProject({ ...newProject, private: privacy });
  }, [privacy]);

  // USE EFFECTS END //
  const handleSubmit = async (event) => {
    event.preventDefault();
    setAddUserToTeamTrigger(true);

    // Add your own userId to the team, because your a member of the project too.
    console.log("Z 122, newProject: ", newProject);
    if (!newProject.team.includes(user)) {
      newProject.team.push(user);
    }

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("data", JSON.stringify(newProject));

    const sendProjectData = async () => {
      setCreateProjectPending(true);
      await fetch(`${host}/projects/add`, {
        credentials: "include",
        method: "POST",
        body: formData,
        // body: JSON.stringify(newProject),
      })
        .then((json) => json.json())
        .then((data) => {
          if (data.status) {
            toast("Great! Your started a new project", toastOptions);
            setAddUserToTeamTrigger(false);
            setCreateProjectPending(false);
            if (!createProjectPending) {
              navigate(`/projectdetails/${data.data._id}`);
            }
          }
          if (data.error) {
            setCreateProjectPending(false);
            toast(data.error, toastOptions);
          }
        });
    };
    if (!newProject.category && newProject !== "") {
      toast("please choose a category", toastOptions);
    }
    const allowed = ["jpeg", "jpg", "png", "gif", "tiff", "bmp"]
    const avatarFormat = thumbnail?.name?.split(".")[1]
    category && category !== "" && !thumbnail || allowed.includes(avatarFormat) ? sendProjectData() : toast.info("please choose a image in one of the following formats: jpeg, jpg, png, gif, tiff, bmp", toastOptions);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="maxM">
      <div className="mb2">
        <h1 className={`central ${color}`}>set up your project </h1>
        <h4 className={`central ${color} mt05`}>
          It is time to amaze the world!
        </h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mt2">
          <div className="col">
            <p className="ml1 mb05">
              name<span className={color}>*</span>
            </p>
            <input
              type="text"
              name="name"
              placeholder="Give your project a catchy name!"
              required
              onChange={handleInput}
              className="shadow-s"
            />
          </div>
          <div className="col">
            <p className="ml1 mb05 mt1">
              description<span className={color}>*</span>
            </p>
            <textarea
              type="text"
              name="description"
              placeholder="what are your goals with this project?"
              required
              onChange={handleInput}
              className="shadow-s"
              id="description"
            />
          </div>
          <div className="col">
            <p className="ml1 mb05 mt1">thumbnail</p>
            <div className={!thumbnailUrl ? `thumbnailS central` : `central`}>
              {thumbnailUrl ? (
                <img className="w100d" src={thumbnailUrl} alt="thumbnail" />
              ) : null}
            </div>
          </div>
          
          <div className="center">
            <label htmlFor="thumbnail">
              <Upload className="fs2 mt1" />
              upload image
            </label>
            <input
              className="dis-none"
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleFile}
              accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
              hidden
            />
          </div>
          <div className="col central">
            <p className="mt15 mb05">
              What is the topic?<span className={color}>*</span>
            </p>
            <CategoriesFilter setCategory={setCategory} />
          </div>
          <div className="col central">
            <p className="mt15 mb05">Pick a color!</p>
            <RadioColor user={user} setFavColor={setFavColor} />
          </div>
        </div>

        {/*  - - - - - COMMUNITY - - - - - */}

        <div>
          <h1 className={`central ${color} mt05`}>your team </h1>
          <div className="flex">
            {team.length > 0 &&
              team.map(
                (talent) =>
                  talent._id !== user._id && (
                    <TalentToProjectCard
                      team={team}
                      setTeam={setTeam}
                      key={talent._id}
                      talent={talent}
                      user={user}
                    />
                  )
              )}
          </div>
        </div>
        <div>
          <div>
            <div className="bo-DARK"></div>
            <div className="mt2 central col">
              <h1 className={`central ${color}`}>expand your team</h1>
              <h4 className={`central ${color} mt05`}>discover more talents</h4>
              <input
                type="text"
                placeholder="search for your team..."
                value={search}
                onChange={handleSearch}
                className="shadow-s mt1"
              />
            </div>
            <div className="flex g1">
              {search &&
                talents
                  .filter(
                    (talent) =>
                      (talent._id !== user._id &&
                        talent.profile.firstName
                          .toLowerCase()
                          .includes(search.toLowerCase())) ||
                      talent.profile.lastName
                        .toLowerCase()
                        .includes(search.toLowerCase())
                  )
                  .map((talent) => (
                    <TalentToProjectCard
                      team={team}
                      setTeam={setTeam}
                      key={talent._id}
                      talent={talent}
                      user={user}
                    />
                  ))}
            </div>
          </div>
        </div>

        {/*  - - - - - INVITATION - - - - - */}
        <div className="mb1 mt4 central">
          <h4 className={`${color}`}>invite to improof</h4>
        </div>
        <div className="mt2">
          <div className="col">
            {eMailFields.map((el, i) => (
              <input
                type="email"
                name={`inviteOthers${i}`}
                onChange={inviteInputHandler}
                placeholder="invite to improof"
                key={i}
                className="shadow-s mb1"
              />
            ))}
          </div>
          <div className="central mt2 flex g3">
            <div>
              <button
                className={
                  eMailFields.length === 5
                    ? `opacity mb05 rel ${bg} central circle40`
                    : `mb05 rel ${bg} central circle40`
                }
                onClick={addEmailFields}
                disabled={eMailFields.length === 5}
              >
                {/* {eMailFields.length === 5 ? (
                  "you can invite more people later in the project"
                ) : ( */}
                <div>
                  <h2 className="central">
                    <MailPlus />
                  </h2>
                </div>
              </button>
              <p>add an email</p>
            </div>

            <div>
              <button
                className={
                  eMailFields.length === 1
                    ? `opacity mb05 rel ${bg} central circle40`
                    : `mb05 rel ${bg} central circle40`
                }
                onClick={subEmailFields}
                disabled={eMailFields.length === 1}
              >
                <h2 className="central">
                  <MailMinus />
                </h2>
              </button>
              <p>delete the mail</p>
            </div>
          </div>
        </div>

        {/*  - - - - - PRIVACY - - - - - */}
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
          <button className={`mb2 mt3 rel ${bg}`} type="submit">
            create your project!
          </button>
        </div>
      </form>
      {/* <ToastContainer /> */}
      <Footer />
    </div>
  );
};

export default CreateProject;
