import { useState, useEffect, useContext } from "react";
import UserContext from "../../context/userContext.jsx";
import TriggerContext from "../../context/triggerContext.jsx";
import { host } from "../../api/host.jsx";

const CategoriesFilter = ({ setCategory, category }) => {
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useContext(TriggerContext);

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
  }, [setCategory]);
  // console.log(category === "Web-Development")
  
  return (
    < div className="mb2">
      <select 
      onChange={handleCategory} name="newsfeed-filter">
        <option value="">All categories</option>
        {category === "Web-Development" 
        ? 
        <option value="Web-Development" selected>Web-Development</option>
        : 
        <option value="Web-Development">Web-Development</option>
        }
        {category === "Software-Development" 
        ? 
        <option value="Software-Development" selected>Software-Development</option>
        : 
        <option value="Software-Development">Software-Development</option>
        }
        {category === "Online-Marketing" 
        ? 
        <option value="Online-Marketing" selected>Online-Marketing</option>
        : 
        <option value="Online-Marketing">Online-Marketing</option>
        }
        {category === "Social-Media-Management" 
        ? 
        <option value="Social-Media-Management" selected>Social-Media-Management</option>
        : 
        <option value="Social-Media-Management">Social-Media-Management</option>
        }
        {category === "UX-UI" 
        ? 
        <option value="UX-UI" selected>UX-UI</option>
        : 
        <option value="UX-UI">UX-UI</option>
        }
        {category === "Electrical Engineering" 
        ? 
        <option value="Electrical Engineering" selected>Electrical Engineering</option>
        : 
        <option value="Electrical Engineering">Electrical Engineering</option>
        }
        {category === "Metalworking" 
        ? 
        <option value="Metalworking" selected>Metalworking</option>
        : 
        <option value="Metalworking">Metalworking</option>
        }
        {category === "Woodworking" 
        ? 
        <option value="Woodworking" selected>Woodworking</option>
        : 
        <option value="Woodworking">Woodworking</option>
        }
        {category === "Handworking" 
        ? 
        <option value="Handworking" selected>Handworking</option>
        : 
        <option value="Handworking">Handworking</option>
        }
        {category === "Gardening" 
        ? 
        <option value="Gardening" selected>Gardening</option>
        : 
        <option value="Gardening">Gardening</option>
        }
        {category === "Gastronomy/Cooking" 
        ? 
        <option value="Gastronomy/Cooking" selected>Gastronomy/Cooking</option>
        : 
        <option value="Gastronomy/Cooking">Gastronomy/Cooking</option>
        }
        {category === "Pedagogy" 
        ? 
        <option value="Pedagogy" selected>Pedagogy</option>
        : 
        <option value="Pedagogy">Pedagogy</option>
        }
        {category === "Science" 
        ? 
        <option value="Science" selected>Science</option>
        : 
        <option value="Science">Science</option>
        }
        {category === "others" 
        ? 
        <option value="others" selected>others</option>
        : 
        <option value="others">others</option>
        }
        {/* <option value="Web-Development">Web-Development</option>
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
        <option value="Science">Science</option>
        <option value="others">others</option> */}
      </select>
    </ div>
  );
};

export default CategoriesFilter;
