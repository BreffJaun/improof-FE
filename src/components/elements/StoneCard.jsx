import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";

const StoneCard = () => {
  const { stoneId } = useParams("stoneId");
  const [stone, setStone] = useState({});

  useEffect(() => {
    setPending(true);
    const fetchStone = async () => {
      fetch(`${host}/stones/${stoneId}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          if (json.status) {
            setStone(json.data);
            const newCon = json.data.team.map((con) => con._id);
            setContributors(newCon);
            setPending(false);
          }
        });
    };
    fetchStone();
  });
  return <div className="news-container">${stone}</div>;
};

export default StoneCard;
