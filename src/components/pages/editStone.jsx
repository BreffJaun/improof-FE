import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../elements/Footer.jsx";

// CONTEXT
import UserContext from "../../context/userContext.jsx";

// ELEMENTS
import { TalentCard } from "../elements/TalentCard.jsx";
import Switch from "react-switch";

const editStone = () => {
  const navigate = useNavigate();
  const [user, setUser] = useContext(UserContext);
  const [editedStone, setEditedStone] = useState({});
  const [project, setProject] = useState({});
  const [isPending, setPending] = useState(true);
  const { stoneId } = useParams("stoneId");
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    setPending(true);
    const fetchProject = async () => {
      fetch(`${host}/stones/${stoneId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status) {
            setProject(json.data);
            setPending(false);
          }
        });
    };
    fetchProject();
  }, [contributors]);
  return <div>editStone</div>;
};

export default editStone;
