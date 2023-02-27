import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";
import { host } from "../../api/host.jsx";

const CategoriesFilter = ({ setCategory, category, searchTrigger, last }) => {
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  console.log(category);

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    fetch(`${host}/users/checklogin`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status) {
          setUser(json.user);
          setTrigger(!trigger);
        } else {
          navigate("/login");
        }
      });
  }, [category]);

  return (
    < div className="mb2">
      <select 
        onChange={handleCategory} 
        name="newsfeed-filter"
        disabled={searchTrigger}
        className="shadow-s"
        defaultValue={category}
      > 
        <option value="">Select category</option>
        <option value="Web-Development">Web-Development</option>
        <option value="Software-Development">Software-Development</option>
        <option value="Online-Marketing">Online-Marketing</option>
        <option value="Social-Media-Management">Social-Media-Management</option>
        <option value="UX-UI">UX-UI</option>
        <option value="Electrical Engineering">Electrical Engineering</option>
        <option value="Metalworking">Metalworking</option>
        <option value="Woodworking">Woodworking</option>
        <option value="Handworking">Handworking</option>
        <option value="Gardening">Gardening</option>
        <option value="Gastronomy/Cooking">Gastronomy/Cooking</option>
        <option value="Pedagogy">Pedagogy</option>
        <option value="Art">Art</option>
        <option value="Design">Design</option>
        <option value="Travel">Travel</option>
        <option value="Photography">Photography</option>
        <option value="Events">Events</option>
        <option value="others">others</option>
      </select>
    </ div>
  );
};

export default CategoriesFilter;
