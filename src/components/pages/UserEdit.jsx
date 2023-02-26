import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import UserContext from "../../context/userContext.jsx";
import "../../styles/colors.scss";

//ICONS
import { AiOutlineCamera } from "react-icons/ai";

import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

// LOGOS
import logoPi from "../../images/improof_PI.png";
import logoBl from "../../images/improof_BL.png";
import logoPu from "../../images/improof_PU.png";
import logoOr from "../../images/improof_OR.png";
import logoDG from "../../images/improof_DG.png";
import logoGR from "../../images/improof_GR.png";
import logoLG from "../../images/improof_LG.png";

//ELEMENTS

import Footer from "../elements/Footer.jsx";
import { RadioColor } from "../buttons/RadioColor.jsx";

const UserEdit = () => {
  const { id } = useParams("id");
  const [avatar, setAvatar] = useState(undefined);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [user, setUser] = useContext(UserContext);
  const initialUserData = { ...user };
  delete initialUserData.profile.password;
  const [userData, setUserData] = useState(initialUserData);

  const [talent, setTalent] = useState(undefined);
  const [isPending, setIsPending] = useState(true);
  const [uploadPending, setUploadPending] = useState(false);

  const [favColor, setFavColor] = useState("");
  // const color = favColor[0]
  const color = talent?.meta?.colorTheme[0];
  const bg = talent?.meta?.colorTheme[1];

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = () => {
      fetch(`${host}/users/${id}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setTalent(json.userData);
            setIsPending(false);
          }
        });
    };
    getUser();
  }, [id, favColor]);
  console.log(user.profile.category);

  const avatarUploadHandler = (e) => {
    setAvatar(e.target.files[0]);
    const image = URL.createObjectURL(e.target.files[0]);
    setAvatarUrl(image);
  };

  const handleInputProfile = (event) => {
    setUserData({
      ...userData,
      profile: { ...userData.profile, [event.target.name]: event.target.value },
    });
  };

  const handleInputLocation = (event) => {
    setUserData({
      ...userData,
      location: {
        ...userData.location,
        [event.target.name]: event.target.value,
      },
    });
  };

  const handleInputContact = (event) => {
    setUserData({
      ...userData,
      contact: { ...userData.contact, [event.target.name]: event.target.value },
    });
  };

  const handleCategoryProfile = (event) => {
    setUserData({
      ...userData,
      profile: { ...userData.profile, [event.target.name]: event.target.value },
    });
  };

  useEffect(() => {
    setUserData({
      ...userData,
      meta: { ...userData.meta, colorTheme: favColor },
    });
  }, [favColor]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("data", JSON.stringify(userData));

    const updateUserData = async () => {
      setUploadPending(true);
      await fetch(`${host}/users/${user._id}`, {
        credentials: "include",
        method: "PATCH",
        body: formData,
        // headers: {"Content-type": "multipart/form-data"},
      })
        .then((json) => json.json())
        .then((data) => {
          if (data.status) {
            toast("Profile updated successfully", {
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
                      ? logoBl
                      : color === "c-GR1"
                      ? logoLG
                      : color === "c-GR3"
                      ? logoGR
                      : logoDG
                  }
                  width="20"
                />
              ),
            });
            navigate(`/userdetails/${user._id}`);
          }
          if (data.error) {
            toast.error(err.msg, toastOptions);
          }
        });
    };
    updateUserData();
  };

  return uploadPending ? (
    <div>Loading...</div>
  ) : !isPending && user.profile.isTalent ? (
    <>
      <form onSubmit={handleSubmit} encType="multipart/form">
        <div className="central col mt3">
          <div className="circle90 bg-FAV central rel">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                className={`circle90 ${bg} central rel`}
                alt="avatar"
              />
            ) : user.profile.avatar ? (
              <img
                src={user.profile.avatar}
                className={`circle90 ${bg} central rel`}
                alt="avatar"
              />
            ) : (
              <div className="initials">
                <p>{user.profile.initials}</p>
              </div>
            )}

            <div
              title="upload image"
              className={`circle40 ${bg} central editBtn`}
            >
              {/* <p className="c-A100">image</p> */}
              <input
                id="uploadAvatar"
                onChange={avatarUploadHandler}
                name="avatar"
                type="file"
                accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
                hidden
              />
              <label for="uploadAvatar" className="c-A100 pointer">
                <AiOutlineCamera />
              </label>
            </div>
          </div>
          <h1
            className={`central ${
              color ? color : user.meta.colorTheme[0]
            } mt05`}
          >
            Hi, {talent.profile.firstName}!
          </h1>
          <p className={`central ${color ? color : user.meta.colorTheme[0]}`}>
            Let´s spice up your profile!
          </p>
        </div>
        <div>
          <RadioColor user={talent} setFavColor={setFavColor} />
        </div>

        <div className="col mt2 mb1">
          <p>
            first name
            <span
              className={`${color ? color : user.meta.colorTheme[0]} fw900`}
            >
              *
            </span>
          </p>
          <input
            onChange={handleInputProfile}
            name="firstName"
            type="text"
            defaultValue={user.profile.firstName}
          />
        </div>
        <div className="col mb1">
          <p>
            last name
            <span
              className={`${color ? color : user.meta.colorTheme[0]} fw900`}
            >
              *
            </span>
          </p>
          <input
            onChange={handleInputProfile}
            name="lastName"
            type="text"
            defaultValue={user.profile.lastName}
          />
        </div>
        <div className="col mb1">
          <p>that´s me:</p>
          <input
            onChange={handleInputProfile}
            name="description"
            type="text"
            defaultValue={user.profile.description}
          />
        </div>
        <div className="central">
          <p>here i perform my best:</p>
          <select onChange={handleCategoryProfile} name="category">
            <option value="">All categories</option>
            {user.profile.category === "Web-Development" ? (
              <option value="Web-Development" selected>
                Web-Development
              </option>
            ) : (
              <option value="Web-Development">Web-Development</option>
            )}
            {user.profile.category === "Software-Development" ? (
              <option value="Software-Development" selected>
                Software-Development
              </option>
            ) : (
              <option value="Software-Development">Software-Development</option>
            )}
            {user.profile.category === "Online-Marketing" ? (
              <option value="Online-Marketing" selected>
                Online-Marketing
              </option>
            ) : (
              <option value="Online-Marketing">Online-Marketing</option>
            )}
            {user.profile.category === "Social-Media-Management" ? (
              <option value="Social-Media-Management" selected>
                Social-Media-Management
              </option>
            ) : (
              <option value="Social-Media-Management">
                Social-Media-Management
              </option>
            )}
            {user.profile.category === "UX-UI" ? (
              <option value="UX-UI" selected>
                UX-UI
              </option>
            ) : (
              <option value="UX-UI">UX-UI</option>
            )}
            {user.profile.category === "Electrical Engineering" ? (
              <option value="Electrical Engineering" selected>
                Electrical Engineering
              </option>
            ) : (
              <option value="Electrical Engineering">
                Electrical Engineering
              </option>
            )}
            {user.profile.category === "Metalworking" ? (
              <option value="Metalworking" selected>
                Metalworking
              </option>
            ) : (
              <option value="Metalworking">Metalworking</option>
            )}
            {user.profile.category === "Woodworking" ? (
              <option value="Woodworking" selected>
                Woodworking
              </option>
            ) : (
              <option value="Woodworking">Woodworking</option>
            )}
            {user.profile.category === "Handworking" ? (
              <option value="Handworking" selected>
                Handworking
              </option>
            ) : (
              <option value="Handworking">Handworking</option>
            )}
            {user.profile.category === "Gardening" ? (
              <option value="Gardening" selected>
                Gardening
              </option>
            ) : (
              <option value="Gardening">Gardening</option>
            )}
            {user.profile.category === "Gastronomy/Cooking" ? (
              <option value="Gastronomy/Cooking" selected>
                Gastronomy/Cooking
              </option>
            ) : (
              <option value="Gastronomy/Cooking">Gastronomy/Cooking</option>
            )}
            {user.profile.category === "Pedagogy" ? (
              <option value="Pedagogy" selected>
                Pedagogy
              </option>
            ) : (
              <option value="Pedagogy">Pedagogy</option>
            )}
            {user.profile.category === "Science" ? (
              <option value="Science" selected>
                Science
              </option>
            ) : (
              <option value="Science">Science</option>
            )}
            {user.profile.category === "others" ? (
              <option value="others" selected>
                others
              </option>
            ) : (
              <option value="others">others</option>
            )}
          </select>
        </div>

        <div className="col mb1">
          <p>tools and skills: </p>
          <input
            onChange={handleInputProfile}
            name="goal"
            type="text"
            defaultValue={user.profile.toolsAndSkills}
          />
        </div>

        <div className="col mb1">
          <p>current occupation:</p>
          <input
            onChange={handleInputProfile}
            name="position"
            type="text"
            defaultValue={user.profile.position}
          />
        </div>
        <div className="col mb1">
          <p>i want to achieve: </p>
          <input
            onChange={handleInputProfile}
            name="goal"
            type="text"
            defaultValue={user.profile.goal}
          />
        </div>

        <div className="bo-DARK"></div>
        <h1
          className={`central ${color ? color : user.meta.colorTheme[0]} mt05`}
        >
          contact:
        </h1>
        <div className="col mb1">
          <p>mobile</p>
          <input
            onChange={handleInputContact}
            name="mobile"
            type="text"
            defaultValue={user.contact.mobile}
          />
        </div>
        <div className="col mb1">
          <p>own website</p>
          <input
            onChange={handleInputContact}
            name="website"
            type="text"
            defaultValue={user.contact.website}
          />
        </div>
        <div className="col mb1">
          <p>1st online profile</p>
          <input
            onChange={handleInputContact}
            name="online1"
            type="text"
            defaultValue={user.contact.online1}
          />
        </div>
        <div className="col mb1">
          <p>2nd online profile</p>
          <input
            onChange={handleInputContact}
            name="online2"
            type="text"
            defaultValue={user.contact.online2}
          />
        </div>
        <div className="col mb1">
          <p>3rd online profile</p>
          <input
            onChange={handleInputContact}
            name="online3"
            type="text"
            defaultValue={user.contact.online3}
          />
        </div>

        <div className="bo-DARK"></div>
        <h1
          className={`central ${color ? color : user.meta.colorTheme[0]} mt05`}
        >
          location
        </h1>
        <div className="col mb1">
          <p>street</p>
          <input
            onChange={handleInputLocation}
            name="street"
            type="text"
            defaultValue={user.location.street}
          />
        </div>
        <div className="col mb1">
          <p>zip</p>
          <input
            onChange={handleInputLocation}
            name="zip"
            type="text"
            defaultValue={user.location.zip}
          />
        </div>
        <div className="col mb1">
          <p>city</p>
          <input
            onChange={handleInputLocation}
            name="city"
            type="text"
            defaultValue={user.location.city}
          />
        </div>

        <div className="bo-DARK"></div>
        <h1
          className={`central ${color ? color : user.meta.colorTheme[0]} mt05`}
        >
          security
        </h1>
        <div className="col mb1">
          <p>set new password</p>
          <input name="" type="text" placeholder="new password" />
        </div>
        <div className="col mb1">
          <p>confirm new password</p>
          <input name="" type="text" placeholder="confirm password" />
        </div>

        <div className="bo-DARK"></div>
        <div className="central">
          <button type="submit" title="save changes" className="bg-FAV">
            <BiCheck />
          </button>
          <button
            onClick={() => navigate(`/userdetails/${user._id}`)}
            title="cancel"
            className="bg-FAV"
          >
            <RxCross2 />
          </button>
        </div>
        <Footer />
        <ToastContainer
          className={
            darkMode
              ? " Toastify__toast-theme--dark"
              : "Toastify__toast-theme--light "
          }
          hideProgressBar={true}
        />
      </form>
    </>
  ) : uploadPending ? (
    <div>Loading...</div>
  ) : !isPending && user.profile.isRecruiter ? (
    <>
      <form onSubmit={handleSubmit}>
        <div className="central col mt3">
          <div className="circle90 bg-FAV central rel">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                className="circle90 bg-FAV central rel"
                alt="avatar"
              />
            ) : user.profile.avatar ? (
              <img
                src={user.profile.avatar}
                className="circle90 bg-FAV central rel"
                alt="avatar"
              />
            ) : (
              <div className="initials">
                <p>{user.profile.initials}</p>
              </div>
            )}
            <div
              title="upload image"
              className="circle40 bg-FAV central editBtn"
            >
              {/* <p className="c-A100">image</p> */}
              <input
                onChange={avatarUploadHandler}
                name="avatar"
                type="file"
                accept=".jpeg, .jpg, .png, .gif, .tiff, .bmp"
              />
            </div>
          </div>
          <h1
            className={`central ${
              color ? color : user.meta.colorTheme[0]
            } mt05`}
          >
            Hi, {user.profile.firstName}!
          </h1>
          {/* <p className={`central ${user ? user.meta.colorTheme[0] : color}`}>Time to find some talents!</p> */}
        </div>

        <div>
          <RadioColor user={talent} setFavColor={setFavColor} />
        </div>
        <div className="col mt2 mb1">
          <p>
            first name
            <span
              className={`${color ? color : user.meta.colorTheme[0]} fw900`}
            >
              *
            </span>
          </p>
          <input
            onChange={handleInputProfile}
            name="firstName"
            type="text"
            defaultValue={user.profile.firstName}
          />
        </div>
        <div className="col mb1">
          <p>
            last name
            <span
              className={`${color ? color : user.meta.colorTheme[0]} fw900`}
            >
              *
            </span>
          </p>
          <input
            onChange={handleInputProfile}
            name="lastName"
            type="text"
            defaultValue={user.profile.lastName}
          />
        </div>
        <div className="col mb1">
          <p>description</p>
          <input
            onChange={handleInputProfile}
            name="description"
            type="text"
            defaultValue={user.profile.description}
          />
        </div>

        <div className="bo-DARK"></div>
        <h1
          className={`central ${color ? color : user.meta.colorTheme[0]} mt05`}
        >
          contact
        </h1>

        <div className="col mb1">
          <p>company</p>
          <input
            onChange={handleInputContact}
            name="company"
            type="text"
            defaultValue={user.contact.company}
          />
        </div>
        <div className="col mb1">
          <p>position</p>
          {/* WRONG INPUTHANDLER */}
          <input
            onChange={handleInputProfile}
            name="position"
            type="text"
            defaultValue={user.profile.position}
          />
        </div>

        <div className="col mb1">
          <p>company website</p>
          <input
            onChange={handleInputContact}
            name="website"
            type="text"
            defaultValue={user.contact.website}
          />
        </div>

        <div className="bo-DARK"></div>
        <h1
          className={`central ${color ? color : user.meta.colorTheme[0]} mt05`}
        ></h1>

        <h1
          className={`central ${color ? color : user.meta.colorTheme[0]} mt05`}
        >
          security
        </h1>
        <div className="col mb1">
          <p>set new password</p>
          <input type="text" placeholder="new password" />
        </div>
        <div className="col mb1">
          <p>confirm new password</p>
          <input type="text" placeholder="confirm password" />
        </div>

        <div className="bo-DARK"></div>
        <div className="central">
          <button type="submit" title="save changes" className="bg-FAV">
            <BiCheck />
          </button>
          <button
            onClick={() => navigate(`/userdetails/${user._id}`)}
            title="cancel"
            className="bg-FAV"
          >
            <RxCross2 />
          </button>
        </div>
        <Footer />
        <ToastContainer
          className={
            darkMode
              ? " Toastify__toast-theme--dark"
              : "Toastify__toast-theme--light "
          }
          hideProgressBar={true}
        />
      </form>
    </>
  ) : null;
};

export default UserEdit;
