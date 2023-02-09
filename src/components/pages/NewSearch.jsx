// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
// import * as dotenv from "dotenv"; dotenv.config();
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Map, Marker, ZoomControl, Overlay, GeoJson, GeoJsonFeature} from "pigeon-maps";
import Geocode from "react-geocode";

// I M P O R T:  F I L E S   &   F U N C T I O N S
import Footer from "../elements/Footer.jsx";
import { host } from "../../api/host.jsx";
import UserContext from "../../context/userContext.jsx";
import { TalentCard } from "../elements/TalentCard.jsx";

// I M P O R T:  K E Y S
import {MAP_BOX_URL, MAP_BOX_ENDPOINT, MAP_BOX_KEY} from "../../api/mapBoxApiKeys.jsx";
// const MAP_BOX_URL = process.env.MAP_BOX_URL
// const MAP_BOX_ENDPOINT = process.env.MAP_BOX_ENDPOINT
// const MAP_BOX_KEY = process.env.REACT_APP_MAP_BOX_KEY;

const NewSearch = () => {
  const navigate = useNavigate();
  const search = {
    position: "",
    tas: "",
    zip: "",
    radius: ""
  }
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const [talents, setTalents] = useState(undefined);
  const [updatedTalents, setUpdatedTalents] = useState(undefined);
  const [currTalent, setCurrTalent] = useState(undefined);
  const [searchData, setSearchData] = useState(search);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const [redMarker, setRedMarker] = useState(false);
  const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      theme: "dark",
  };
  let talentsToMap;

  useEffect(() => {
    // FETCH ALL TALENTS FOR THE MAP & FETCH LAT. & LON. FROM MAP BOX & SET IN USERS
    const getUsers = async () => {
      await fetch(`${host}/users`)
        .then((response) => response.json())
        .then((json) => {
            const onlyTalents = json.filter(user => user.profile.isTalent)
            setTalents(onlyTalents)
            setLoading(false)
            for (let i = 0; i < onlyTalents.length; i++) {
              const talent = onlyTalents[i];
              const street = talent.location.street;
              const zip = talent.location.zip;
              const city = talent.location.city;
              const SEARCH_TEXT = `${street}, ${zip} ${city}`;
              const getUserLatLon = async () => {
                await fetch(`${MAP_BOX_URL}/${MAP_BOX_ENDPOINT}/${SEARCH_TEXT}.json?access_token=${MAP_BOX_KEY}`)
                .then((res) => res.json())
                .then((json) => {
                  // console.log(i);
                  const lat = json.features[0].center[1];
                  const lon = json.features[0].center[0];
                  // console.log(lat, lon)
                  const newTalent = {...talent, location: {...talent.location, latitude: lat, longitude: lon}};
                  // console.log('newTalent: ', newTalent)
                  setTalents((t) => t.map((talent, index) => i === index ? newTalent : talent));
                })
                .catch(error => console.log(talent, error))
              }
              street && zip && city && getUserLatLon();
            }
      })
    }
    getUsers();
  }, []);

  // SET SEARCH DATA & ADD LONG.- & LATITUDE START //
  const handleInput = (event) => {
    setSearchData({...searchData, [event.target.name]: event.target.value});
  };

  const searchTriggerHandler = () => {
    setSearchTrigger(!searchTrigger);
  }

  const redMarkerHandler = () => {
    setRedMarker(!redMarker);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const position = searchData.position;
    const tas = searchData.tas;
    const zip = searchData.zip;
    const radius = searchData.radius;
    const SEARCH_TEXT = `${zip}`;
    const getSearchData = async () => {
      await fetch(`${MAP_BOX_URL}/${MAP_BOX_ENDPOINT}/${SEARCH_TEXT}.json?access_token=${MAP_BOX_KEY}`)
      .then((res) => res.json())
      .then((json) => {
        const lat = json.features[0].center[1];
        const lon = json.features[0].center[0];
        const newSearchData = {...searchData, latitude: lat, longitude: lon};
        setSearchData(newSearchData); 
        setSearchTrigger(true);
        setRedMarker(true);
        // SET SEARCH DATA & ADD LONG.- & LATITUDE END //
        // CALCULATE & FILTER DISTANCE WITH GEOCODES START //
        const talentsWithDistance = talents.map((talent, i) => { 
          const dist = getDistanceFromLatLonInKm(
            talent.location.latitude,
            talent.location.longitude,  
            newSearchData.latitude,
            newSearchData.longitude
          );
          return {...talent, location: {...talent.location, distance: dist}};
        });
        setUpdatedTalents(talentsWithDistance); 
        // console.log('talentsWithDistance: ', talentsWithDistance)

        // FILTER TALENTS ON DISTANCE
        const talentsSortedByDistance = talentsWithDistance.filter((talent) => !Object.is(talent.location.distance, NaN)).filter((talent) => talent.location.distance < radius).sort(
          (a, b) => a.location.distance - b.location.distance
        );
        setUpdatedTalents(talentsSortedByDistance);
        // console.log('talentsSortedByDistance: ', talentsSortedByDistance)
      })     
      .catch(error => console.log(searchData, error))
    }
    zip && radius && getSearchData();
    // CALCULATE & FILTER DISTANCE WITH GEOCODES END //
    
    // POSITION FILTER
    if(updatedTalents && position) {
      setSearchTrigger(true)
      console.log('POSITION IF')
      setUpdatedTalents(updatedTalents.filter((talent) => talent.profile.position.includes(position)))
      // talentsToMap = updatedTalents.filter((talent) => talent.profile.position.includes(position));
      console.log(talentsToMap)
    } else if (position) {
      setSearchTrigger(true)
      console.log('POSITION ELSE')
      setUpdatedTalents(talents.filter((talent) => talent.profile.position.includes(position)))
      // console.log(talentsToMap)
    }

    // TOOLS & SKILLS FILTER
    if(updatedTalents && tas) {
      setSearchTrigger(true)
      console.log('TAS IF')
      setUpdatedTalents(updatedTalents.filter((talent) => talent.profile.toolsAndSkills.includes(tas)));
      // console.log(talentsToMap)
    } else if (tas) {
      setSearchTrigger(true)
      console.log('TAS ELSE')
      setUpdatedTalents(talents.filter((talent) => talent.profile.toolsAndSkills.includes(tas)));
      // console.log(talentsToMap)
    }
    

  };
  // updatedTalents && console.log('updatedTalents: ', updatedTalents)

  // SET THE RIGHT TALENT SOURCE TO map OVER FOR THE "MAP"
  if(updatedTalents) {
    talentsToMap = updatedTalents
  } else {
    talentsToMap = talents
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

  // FETCH TO SAVE SEARCHDATA //
  // await fetch(`${host}/newsearch`, {

//     method: 'POST',
//     body: JSON.stringify(searchData),
//     headers: {
//         'Content-type': 'application/json; charset=UTF-8',
//     },
// })
//     .then((response) => response.json())
//     .then((json) => {
//         console.log(json)
//         if (!json.status) {
//             toast.error(json.error, toastOptions);
//         }
//     });
  

// SHOW PIN OVERLAYS
const overlayHandler = (e, talent) => {
  setCurrTalent(talent);
};
  
// RESET SEARCH START //
const resetHandler = () => {
  setUpdatedTalents(undefined);
  setSearchData(search);
  setCurrTalent(undefined);
  setSearchTrigger(false);
  setRedMarker(false)
};
console.log('searchTrigger: ', searchTrigger)
console.log('redMarker: ', redMarker)

// RESET SEARCH END //

// const geoJsonFeatureSample = {
//   type: "Feature",
//   geometry: { type: "Point", coordinates: [2.0, 48.5] },
//   properties: { prop0: "value0" },
// };

  return !isLoading && (
    < div className="componente">
        <div className="mb2 mt2">
            </div>
            <p className="central c-FAV mb2">new search</p>
            <form onSubmit={handleSubmit}>
                <div className="central col">
                    <p>position</p>
                    <input
                        type="text"
                        name="position"
                        placeholder="what do you want to achieve"
                        onChange={handleInput}
                        disabled={searchTrigger}
                        value={searchData.position}
                        
                    />
                    <p>tools & skills</p>
                    <input 
                        type="text" 
                        name="toolsAndSkills" 
                        placeholder="what is the talents set" 
                        onChange={handleInput}
                        disabled={searchTrigger} 
                        value={searchData.tas}
                    />
                    <p>ZIP-Code</p>
                    <input 
                        type="text" 
                        name="zip" 
                        placeholder="type in a number" 
                        onChange={handleInput}
                        disabled={searchTrigger}
                        value={searchData.zip}
                    />
                    <p>search radius (km)</p>
                    <input 
                        style={{cursor:'pointer'}}
                        type="text" 
                        name="radius" 
                        placeholder="type in a number" 
                        onChange={handleInput}
                        disabled={searchTrigger}
                        value={searchData.radius}
                    />
                </div>
                <div className="central mb2 mt2">
                    <button 
                      style={{cursor:'pointer'}}
                      type="submit" 
                      className="bg-FAV"
                      disabled={searchTrigger}
                    >get result</button>
                </div> 
                <div className="central mb2 mt2">
                    <button 
                      style={{cursor:'pointer'}}
                      type="reset" 
                      className="bg-FAV"
                      disabled={!searchTrigger}
                      onClick={resetHandler}
                    >reset search</button>
                </div>        
              </form>
            <div>
              
              {(talents) && (
              <Map
                height={280}
                width={800}
                defaultCenter={[51.165691, 10.451526]} // MIDDLE OF GERMANY
                center={[
                  searchData?.latitude,
                  searchData?.longitude,
                ]}
                defaultZoom={5} // je größer die Zahl, desto weiter rein gezoomt
              >
              {/* RED MARKER FOR ZIP */}
              {redMarker ?
                <Marker
                  width={30}
                  color={"red"}
                  anchor={[searchData.latitude, searchData.longitude]}
                /> :
                <></>             
              }

              {/* MAP ABOUT UPDATED TALENTS => IF THEY AREN´T SET, MAP ABOUT TALENTS */}
              {talentsToMap.map((talent) => {
                if(talent.location.latitude) {
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
              {currTalent && (
                <Overlay
                  anchor={[
                    +currTalent.location.latitude,
                    +currTalent.location.longitude,
                  ]}
                  offset={[120, 79]}
                >
                  <div width={240} height={158} alt="">
                    {currTalent.profile.firstName + ", " + currTalent.profile.lastName}
                  </div>
                </Overlay>
              )}
                <ZoomControl />
                {/* <GeoJson
                  svgAttributes={{
                    fill: "#d4e6ec99",
                    strokeWidth: "1",
                    stroke: "white",
                    r: "20",
                  }}
                >
                  <GeoJsonFeature feature={geoJsonFeatureSample} />
                </GeoJson> */}
              </Map>
              )}
            </div>
            {/* CURR TALENT */}
            {currTalent && (
              <div>
                <h1>SELECTED TALENT</h1>
                <TalentCard talent={currTalent} user={user} key={currTalent._id}/>
                <div className="bo-DARK"></div>
              </div>
            )}
            {/* SEARCHED TALENTS (OR ALL TALENTS) */}
            <div>
              {updatedTalents ? (<h1>FILTERED TALENTS</h1>) : (<h1>TALENTS</h1>)}
              {talentsToMap.map((talent) => {
                return (
                <TalentCard talent={talent} user={user} key={talent._id}/>
              )})}
            </div>
            <Footer/>
            <ToastContainer />
    </ div>
  );
};

export default NewSearch;