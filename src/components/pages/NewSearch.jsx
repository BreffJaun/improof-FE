// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";
// import Geocode from "react-geocode";

// I M P O R T:  F I L E S   &   F U N C T I O N S
import Footer from "../elements/Footer.jsx";
import { host } from "../../api/host.jsx";
import UserContext from "../../context/userContext.jsx";
import { TalentCard, TalentCardS } from "../elements/TalentCard.jsx";
import CategoriesFilter from "../elements/CategoriesFilter.jsx";

// I M P O R T:  K E Y S
import {
  MAP_BOX_URL,
  MAP_BOX_ENDPOINT,
  MAP_BOX_KEY,
} from "../../api/mapBoxApiKeys.jsx";

// LOGOS
import logoDG from "../../images/improof_DG.png";
import logoGR from "../../images/improof_GR.png";
import logoLG from "../../images/improof_LG.png";

// STYLES
import "../../styles/toastify.scss";

const NewSearch = () => {
  const navigate = useNavigate();
  const search = {
    // position: "",
    category: "",
    toolsAndSkills: "",
    zip: "",
    radius: "",
  };
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const [talents, setTalents] = useState(undefined);
  const [updatedTalents, setUpdatedTalents] = useState(undefined);
  const [currTalent, setCurrTalent] = useState(undefined);
  const [searchData, setSearchData] = useState(search);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [redMarker, setRedMarker] = useState(false);
  const [category, setCategory] = useState(undefined);

  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const darkMode = user.meta.darkMode;
  const theme = darkMode ? "dark" : "light";

  let talentsToMap;

  useEffect(() => {
    // FETCH ALL TALENTS FOR THE MAP & FETCH LAT. & LON. FROM MAP BOX & SET IN USERS
    const getUsers = async () => {
      await fetch(`${host}/users`)
        .then((response) => response.json())
        .then((json) => {
          const onlyTalents = json.filter((user) => user.profile.isTalent);
          setTalents(onlyTalents);
          setLoading(false);
          for (let i = 0; i < onlyTalents.length; i++) {
            const talent = onlyTalents[i];
            const street = talent.location.street;
            const zip = talent.location.zip;
            const city = talent.location.city;
            const SEARCH_TEXT = `${street}, ${zip} ${city}`;
            const getUserLatLon = async () => {
              await fetch(
                `${MAP_BOX_URL}/${MAP_BOX_ENDPOINT}/${SEARCH_TEXT}.json?access_token=${MAP_BOX_KEY}`
              )
                .then((res) => res.json())
                .then((json) => {

                  const lat = json.features[0].center[1];
                  const lon = json.features[0].center[0];

                  const newTalent = {
                    ...talent,
                    location: {
                      ...talent.location,
                      latitude: lat,
                      longitude: lon,
                    },
                  };
                    setTalents((t) =>
                    t.map((talent, index) => (i === index ? newTalent : talent))
                  );
                })
                .catch((error) => console.log(talent, error));
            };
            street && zip && city && getUserLatLon();
          }
        });
    };
    getUsers();
  }, []);

  // SET SEARCH DATA & ADD LONG.- & LATITUDE START //
  const handleInput = (event) => {
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setSearchData({ ...searchData, category: category });
  }, [category]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const position = searchData.position;
    const category = searchData.category;
    const toolsAndSkills = searchData.toolsAndSkills;
    const zip = searchData.zip;
    const radius = searchData.radius;
    const SEARCH_TEXT = `${zip}`;
    let filteredTalents;

    if (zip && radius) {
      fetch(
        `${MAP_BOX_URL}/${MAP_BOX_ENDPOINT}/${SEARCH_TEXT}.json?access_token=${MAP_BOX_KEY}`
      )
        .then((res) => res.json())
        .then((json) => {
          const lat = json.features[0].center[1];
          const lon = json.features[0].center[0];
          const newSearchData = {
            ...searchData,
            latitude: lat,
            longitude: lon,
          };
          setSearchData(newSearchData);
          // SET SEARCH DATA & ADD LONG.- & LATITUDE END //
          // CALCULATE & FILTER DISTANCE WITH GEOCODES START //
          filteredTalents = talents.map((talent, i) => {
            const dist = getDistanceFromLatLonInKm(
              talent.location.latitude,
              talent.location.longitude,
              newSearchData.latitude,
              newSearchData.longitude
            );
            return {
              ...talent,
              location: { ...talent.location, distance: dist },
            };
          });

          // FILTER TALENTS ON DISTANCE
          filteredTalents = filteredTalents
            .filter((talent) => !Object.is(talent.location.distance, NaN))
            .filter((talent) => talent.location.distance < radius)
            .sort((a, b) => a.location.distance - b.location.distance);

          // console.log("filteredTalents: ", filteredTalents);
          // CATEGORY FILTER
          if (category) {
            filteredTalents = filteredTalents.filter((talent) =>
              talent.profile.category.includes(category)
            );
            // console.log("CATEGORY IF");
          }

          // TOOLS & SKILLS FILTER
          if (toolsAndSkills) {
            filteredTalents = filteredTalents.filter((talent) =>
              talent.profile.toolsAndSkills.includes(toolsAndSkills)
            );
          }
          setSearchTrigger(true);
          setRedMarker(true);
          // console.log("filteredTalents: ", filteredTalents);
          setUpdatedTalents(filteredTalents);
        })
        .catch((error) => console.log(searchData, error));
    }
    if (!zip && !radius) {
      // CATEGORY FILTER
      if (category) {
        filteredTalents = talents.filter((talent) =>
          talent.profile.category.includes(category)
        );
      }

      // TOOLS & SKILLS FILTER
      if (toolsAndSkills) {
        if (category) {
          filteredTalents = filteredTalents.filter((talent) =>
            talent.profile.toolsAndSkills.includes(toolsAndSkills)
          );
        } else {
          filteredTalents = talents.filter((talent) =>
            talent.profile.toolsAndSkills.includes(toolsAndSkills)
          );
        }
      }
      setSearchTrigger(true);
      // console.log("filteredTalents: ", filteredTalents);
      setUpdatedTalents(filteredTalents);
    }
  };

  // SET THE RIGHT TALENT SOURCE TO map OVER FOR THE "MAP"
  if (updatedTalents) {
    talentsToMap = updatedTalents;
  } else {
    talentsToMap = talents;
  }

  // FUNCTIONS TO CALCULATE DISTANCE START //
  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  };
  // FUNCTIONS TO CALCULATE DISTANCE END //

  // SHOW PIN OVERLAYS
  const overlayHandler = (e, talent) => {
    setCurrTalent(talent);
  };

  // RESET SEARCH START //
  const resetHandler = () => {
    setUpdatedTalents(undefined);
    setSearchData(search);
    setCategory(undefined);
    setCurrTalent(undefined);
    setSearchTrigger(false);
    setRedMarker(false);
  };
  // console.log("searchTrigger: ", searchTrigger);
  // console.log("redMarker: ", redMarker);
  // console.log("searchData LAT: ", searchData.latitude);
  // console.log("searchData LON: ", searchData.longitude);

  // RESET SEARCH END //

  return (
    !isLoading && (
      <div>
        <h1 className={`${color} mt1 mb1`}>new search</h1>

        <div className="splitscreen">
          <div className="oh card left mt15">
            <div>
              {talents && (
                <Map
                  height={380}
                  width={1000}
                  defaultCenter={[51.165691, 10.451526]} // MIDDLE OF GERMANY
                  center={[searchData?.latitude, searchData?.longitude]}
                  defaultZoom={5} // je größer die Zahl, desto weiter rein gezoomt
                >
                  {/* RED MARKER FOR ZIP */}
                  {redMarker ? (
                    <Marker
                      width={30}
                      color={"red"} // SET HERE RECRUITER COLOR ! ! !
                      anchor={[searchData.latitude, searchData.longitude]}
                    />
                  ) : (
                    <></>
                  )}

                  {/* MAP ABOUT UPDATED TALENTS => IF THEY AREN´T SET, MAP ABOUT TALENTS */}
                  {talentsToMap.map((talent) => {
                    if (talent.location.latitude) {
                      return (
                        <Marker
                          width={30}
                          anchor={[
                            +talent.location.latitude,
                            +talent.location.longitude,
                          ]}
                          key={talent._id}
                          onClick={(e) => overlayHandler(e, talent)}
                        />
                      );
                    }
                  })}
                  {/* {currTalent && (
                <Overlay
                  anchor={[
                    +currTalent.location.latitude,
                    +currTalent.location.longitude,
                  ]}
                  offset={[120, 79]}
                >
                  <div width={240} height={158} alt="">
                    {currTalent.profile.firstName +
                      ", " +
                      currTalent.profile.lastName}
                  </div>
                </Overlay>
              )} */}
                  <ZoomControl />
                </Map>
              )}
            </div>
          </div>
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="col">
                <p className="ml1 mb05">category</p>
                {/* <input
                    type="text"
                    name="position"
                    placeholder="what do you want to achieve"
                    onChange={handleInput}
                    disabled={searchTrigger}
                    value={searchData.position}
                  /> */}
                <CategoriesFilter
                  category={category}
                  setCategory={setCategory}
                  searchTrigger={searchTrigger}
                />

                <p className="ml1 mb05">tools & skills</p>
                <input
                  type="text"
                  name="toolsAndSkills"
                  placeholder="what is the talents set"
                  onChange={handleInput}
                  disabled={searchTrigger}
                  value={searchData.toolsAndSkills}
                  className="shadow-s"
                />
                <p className="ml1 mt1 mb05">ZIP-Code</p>
                <input
                  type="text"
                  name="zip"
                  placeholder="type in a number"
                  onChange={handleInput}
                  disabled={searchTrigger}
                  value={searchData.zip}
                  className="shadow-s"
                />
                <p className="ml1 mt1 mb05">search radius (km)</p>
                <input
                  style={{ cursor: "pointer" }}
                  type="text"
                  name="radius"
                  placeholder="type in a number"
                  onChange={handleInput}
                  disabled={searchTrigger}
                  value={searchData.radius}
                  className="shadow-s"
                />
              </div>

              <div className="row central g1">
                <div className="central mb2 mt2">
                  <button
                    style={{ cursor: "pointer" }}
                    type="submit"
                    className={searchTrigger ? `opacity ${bg}` : `${bg}`}
                    disabled={searchTrigger}
                  >
                    get result
                  </button>
                </div>
                <div className="central mb2 mt2">
                  <button
                    style={{ cursor: "pointer" }}
                    type="reset"
                    className={!searchTrigger ? `opacity ${bg}` : `${bg}`}
                    disabled={!searchTrigger}
                    onClick={resetHandler}
                  >
                    reset search
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* CURR TALENT */}
        {currTalent && (
          <div className="ass">
            <h1 className={`${color} mt2 mb2 center`}>selected talent</h1>
            <TalentCardS talent={currTalent} user={user} key={currTalent._id} />
          </div>
        )}
        <div className="bo-DARK"></div>
        <div>
          {/* SEARCHED TALENTS (OR ALL TALENTS) */}
          <div className="max mb2">
            {updatedTalents ? (
              <h1 className={`${color} mt2 mb2`}>filtered talents</h1>
            ) : (
              <h1 className={`${color} mt2 mb2`}>all talents</h1>
            )}

            <div className="talent-container  mb2 row">
              {talentsToMap.map((talent) => {
                return (
                  <TalentCard
                    talent={talent}
                    user={user}
                    key={talent._id}
                    theme={theme}
                  />
                );
              })}
            </div>
          </div>

          <ToastContainer />
        </div>
        <Footer />
      </div>
    )
  );
};

export default NewSearch;

// POSITION FILTER
// if (updatedTalents && position) {
//   setSearchTrigger(true);
//   setUpdatedTalents(
//     updatedTalents.filter((talent) =>
//     talent.profile.position.includes(position)));
//     // talentsToMap = updatedTalents.filter((talent) => talent.profile.position.includes(position));
//   console.log("POSITION IF");
//   console.log(talentsToMap);
// } else if (position) {
//   setSearchTrigger(true);
//   setUpdatedTalents(
//     talents.filter((talent) => talent.profile.position.includes(position))
//     );
//   console.log("POSITION ELSE");
//   // console.log(talentsToMap)
// }
