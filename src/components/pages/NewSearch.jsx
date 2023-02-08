// I M P O R T:  E X T E R N A L  D E P E N D E N C I E S
// import * as dotenv from "dotenv"; dotenv.config();
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Map, Marker, ZoomControl, Overlay } from "pigeon-maps";
import Geocode from "react-geocode";

// I M P O R T:  F I L E S   &   F U N C T I O N S
import Footer from "../elements/Footer.jsx";
import { host } from "../../api/host.jsx";
import UserContext from "../../context/userContext.jsx";

// I M P O R T:  K E Y S
import {MAP_BOX_URL, MAP_BOX_ENDPOINT, MAP_BOX_KEY} from "../../api/mapBoxApiKeys.jsx";
// const MAP_BOX_URL = process.env.MAP_BOX_URL
// const MAP_BOX_ENDPOINT = process.env.MAP_BOX_ENDPOINT
// const MAP_BOX_KEY = process.env.REACT_APP_MAP_BOX_KEY;

const NewSearch = () => {
  const navigate = useNavigate();
  // const search = {
  //   position: "",
  //   tas: "",
  //   zip: "",
  //   radius: ""
  // }
  const [user, setUser] = useContext(UserContext);
  const [isLoading, setLoading] = useState(true);
  const [talents, setTalents] = useState(undefined);
  const [updatedTalents, setUpdatedTalents] = useState(undefined);
  const [currTalent, setCurrTalent] = useState(undefined);
  const [searchData, setSearchData] = useState(undefined);
  const [searchTrigger, setSearchTrigger] = useState(false);
  const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      theme: "dark",
  };

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
  const handleSubmit = (event) => {
    event.preventDefault();
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
        // console.log('talentsWithDistance: ', talentsWithDistance)
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
  };
  updatedTalents && console.log('updatedTalents: ', updatedTalents)

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
                    />
                    <p>tools & skills</p>
                    <input 
                        type="text" 
                        name="toolsAndSkills" 
                        placeholder="what is the talents set" 
                        onChange={handleInput} 
                    />
                    <p>ZIP-Code</p>
                    <input 
                        type="text" 
                        name="zip" 
                        placeholder="type in a number" 
                        onChange={handleInput}
                    />
                    <p>search radius (km)</p>
                    <input 
                        type="number" 
                        name="radius" 
                        placeholder="type in a number" 
                        onChange={handleInput}
                    />
                </div>
                <div className="central mb2 mt2">
                    <button type="submit" className="bg-FAV">get result</button>
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
            
              {searchData ?
                <Marker
                  width={30}
                  color={"red"}
                  anchor={[searchData.latitude, searchData.longitude]}
                /> :
                <></>             
              }
              
              {talents?.map((talent) => {
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
              </Map>
              )}
            </div>
            <Footer/>
            <ToastContainer />
    </ div>
  );
};

export default NewSearch;