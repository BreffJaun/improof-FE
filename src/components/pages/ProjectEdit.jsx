import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../../context/userContext.jsx";

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
  const { id } = useParams("id");
  const navigate = useNavigate();
  const [project, setProject] = useState(undefined);
  const [eMailFields, setEmailFields] = useState([1]);
  const [user, setUser] = useContext(UserContext);
  const initial = { userId: user._id };
  const [thumbnail, setThumbnail] = useState(undefined);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [projectColor, setProjectColor] = useState("orange");
  const [category, setCategory] = useState(undefined);
  const [privacy, setPrivacy] = useState(false);
  const [newProject, setNewProject] = useState(project);
  const [talents, setTalents] = useState([]);
  const [favColor, setFavColor] = useState("");
  const [isPending, setPending] = useState(false);
  const [uploadPending, setUploadPending] = useState(false);
  const [createProjectPending, setCreateProjectPending] = useState(false);
  const [team, setTeam] = useState(project?.team);
  const [inviteEmail, setInviteEmail] = useState([]);
  const follows = user.follows;
  const [addUserIdToProjectTrigger, setAddUserIdToProjectTrigger] =
    useState(false);
  const [search, setSearch] = useState("");
  const [trigger, setTrigger] = useState(false);

  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    // theme: "dark",
  };

  useEffect(() => {
    setPending(true);
    const getUsers = async () => {
      fetch(`${host}/users`)
        .then((response) => response.json())
        .then((json) => {
          const onlyTalents = json.filter((user) => user.profile.isTalent);
          setTalents(onlyTalents);
          setPending(false);
        });
    };
    getUsers();
  }, []);

  // FETCH CURR PROJECT
  useEffect(() => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    setPending(true);
    const fetchProject = async () => {
      fetch(`${host}/projects/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setProject(json.data);
            setPending(false);
            setCategory(json.data.category);
            setTeam(json.data.team);
            darkMode ? setTheme("dark") : setTheme("light");
            setThumbnail(json.data.thumbnail);
          }
        });
    };
    fetchProject();
  }, [id]);

  // Follows which are not in team // You filter teammembers out of the follows
  const noTeamFollowsFilter = (arr1, arr2) => {
    let clean = [];
    clean = arr1.filter((el) => {
      return !arr2.some((element) => {
        return element._id === el._id;
      });
    });
    return clean;
  };
  const noTeamFollows = project && noTeamFollowsFilter(follows, project.team);

  // console.log("team: ", team)
  // console.log("follows: ", follows)
  // console.log("noTeamFollows: ", noTeamFollows)

  // Community without team members and follows // You filter noTeamFollows out of the community
  const noFollowsFilter = (arr1, arr2) => {
    let clean = [];
    clean = arr1.filter((el) => {
      return !arr2.some((element) => {
        return element._id === el._id;
      });
    });
    return clean;
  };
  const noFollows = project && noFollowsFilter(noTeamFollows, follows);

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
    setNewProject({ ...newProject, team: team });
    setSearch("");
    // setTrigger(!trigger)
  }, [team]);

  useEffect(() => {
    setNewProject({ ...newProject, userId: user._id });
    // console.log('ICH WURDE AUSGEFÜHRT')
  }, [project]);

  useEffect(() => {
    setNewProject({ ...newProject, inviteOthers: Object.values(inviteEmail) });
  }, [inviteEmail]);

  useEffect(() => {
    setNewProject({ ...newProject, private: privacy });
  }, [privacy]);

  // USE EFFECTS END //

  const handleSubmit = (event) => {
    event.preventDefault();

    // Add your own userId to the project, because we need to check if you should could change something in the project.

    console.log("Z 169, newProject: ", newProject);

    const formData = new FormData();
    formData.append("thumbnail", thumbnail);
    formData.append("data", JSON.stringify(newProject));

    const sendProjectData = async () => {
      setUploadPending(true);
      await fetch(`${host}/projects/${id}`, {
        credentials: "include",
        method: "PATCH",
        body: formData,
        // body: JSON.stringify(newProject),
      })
        .then((json) => json.json())
        .then((data) => {
          if (data.status) {
            toast("Your changes are saved", {
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
                      : color === "c-GR2"
                      ? logoGR
                      : logoDG
                  }
                  width="20"
                />
              ),
            });
            setUploadPending(false);
            if (!createProjectPending) {
              navigate(`/projectdetails/${data.data._id}`);
            }
          }
          if (data.error) {
            // setUploadPending(false);
            toast(data.error, {
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
                      : color === "c-GR2"
                      ? logoGR
                      : logoDG
                  }
                  width="20"
                />
              ),
            });
          }
        });
    };
    sendProjectData();
  };
  // project && console.log(project.team)
  const handleDelete = async () => {
    console.log(user._id, project._id);
    await fetch(`${host}/projects/${project._id}`, {
      credentials: "include",
      method: "DELETE",
      body: JSON.stringify({
        userId: user._id,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => navigate("/myprojects"));
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  return uploadPending ? (
    <div>Loading...</div>
  ) : (
    project && (
      <>
        <div className="mt2 mb2">
          <h1 className={`central ${color}`}>edit your project</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="maxM mt2">
            <div className="col">
              <p className="ml1 mt15 mb05">
                project name<span className={color}>*</span>
              </p>
              <input
                type="text"
                name="name"
                defaultValue={project.name}
                maxLength={40}
                onChange={handleInput}
                className="shadow-s"
              />
            </div>

            <div className="col">
              <p className="ml1 mt15 mb05">
                description<span className={color}>*</span>
              </p>
              <textarea
                type="text"
                rows="7"
                name="description"
                placeholder={project.description}
                maxLength={300}
                onChange={handleInput}
                className="shadow-s"
              />
            </div>

            <div className="col">
              <p className="ml1 mt15 mb05">thumbnail</p>
              {/* <div className="thumbnailS"> */}
              {thumbnailUrl ? (
                <img
                  className="center"
                  width={200}
                  src={thumbnailUrl}
                  alt="thumbnail"
                />
              ) : project.thumbnail ? (
                <img width={200} src={project.thumbnail} alt="thumbnail" />
              ) : (
                <div className="central">PLATZHALTER</div>
              )}
              <div title="upload">
                <Camera />
              </div>
              {/* </div> */}
              <input
                type="file"
                name="thumbnail"
                onChange={handleFile}
                accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
              />
            </div>

            <div className="col center">
              <p className="mt15 central mb05">category:</p>
              {/* <p className="c-A50 mb05">right now: {project.category}</p> */}
              <CategoriesFilter setCategory={setCategory} category={category} />
            </div>

            <div>
              <p className="mb05 central">project color:</p>
              <RadioColor
                className="row"
                user={user}
                setFavColor={setFavColor}
              />
            </div>
          </div>

          {/*  - - - - - TEAM - - - - - */}
          <div className="bo-DARK"></div>
          <div className="mt2 mb2">
            <h1 className={`central ${color}`}>your team</h1>
            <h1 className={`central ${color}`}>your team</h1>
          </div>
          <div className="talent-container">
            {team.map((talent) => (
              <TalentToProjectCard
                team={team}
                setTeam={setTeam}
                key={talent._id}
                talent={talent}
                user={user}
                // projectEdit={true}
              />
            ))}
          </div>

          {/*  - - - - - SEARCH TALENTS - - - - - */}
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
          <div>
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
          {/* <div className="talent-container">
            {noFollows &&
              noFollows.map(
                (talent) =>
                  talent._id !== user._id && (
                    <TalentToProjectCard
                      team={team}
                      setTeam={setTeam}
                      key={talent._id}
                      talent={talent}
                      user={user}
                      // projectEdit={true}
                    />
                  )
              )}
          </div> */}

          {/*  - - - - - INVITATION - - - - - */}
          <div className="maxM">
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
                    className="shadow-s"
                  />
                ))}
              </div>
              <div className="central mt2 flex g3">
                <div>
                  <button
                    className={`mb05 rel ${bg} central circle40`}
                    onClick={addEmailFields}
                    disabled={eMailFields.length === 5}
                  >
                    {eMailFields.length === 5 ? (
                      "you can invite more people later in the project"
                    ) : (
                      <div>
                        <h2 className="central">
                          <MailPlus />
                        </h2>
                      </div>
                    )}
                  </button>
                  <p>add an email</p>
                </div>

                <div>
                  <button
                    className={`mb05 rel ${bg} central circle40`}
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
          </div>

          {/*  - - - - - PRIVACY - - - - - */}
          <div className="bo-DARK"></div>
          <div className="col">
            <RadioPrivacy setPrivacy={setPrivacy} />
            <button type="submit" className={`mt2 ${bg}`}>
              save changes
            </button>
          </div>
        </form>
        <button className="mt2 bg-FAV" onClick={() => handleDelete()}>
          DELETE PROJECT BITTE BESSER KENNZEICHNEN!
        </button>
        <ToastContainer />
      </>
    )
  );
};

export default CreateProject;
