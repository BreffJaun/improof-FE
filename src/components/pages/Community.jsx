import { host } from "../../api/host.jsx";
import { useContext, useEffect, useState } from "react";

//ELEMENTE
import { TalentCard } from "../elements/TalentCard.jsx";
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import Footer from "../elements/Footer.jsx";

// CONTEXT
import TriggerContext from "../../context/triggerContext.jsx";
import UserContext from "../../context/userContext.jsx";
import { ToastContainer } from "react-toastify";

const Community = () => {
  const [category, setCategory] = useState(undefined);
  const [talents, setTalents] = useState(undefined);
  const [user, setUser] = useContext(UserContext);
  const [trigger, setTrigger] = useContext(TriggerContext);
  const [isPending, setPending] = useState(false);
  const color = user.meta.colorTheme[0];
  const bg = user.meta.colorTheme[1];
  const darkMode = user.meta.darkMode;

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
  }, [category]);

  useEffect(() => {
    fetch(`${host}/users/checklogin`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((json) => {
        setPending(false);
        if (json.status) {
          setUser(json.user);
        } else {
          navigate("/login");
        }
      });
  }, [trigger, category]);

  return (
    <>
      <div className="mb2">
        <h1 className={`central ${color}`}>community</h1>
      </div>
      <div className="mb2 central">
        <CategoriesFilter setCategory={setCategory} />
      </div>
      <div className="mb2 central">
        <h4 className={`central ${color}`}>your star talents</h4>
      </div>

      <div className="talent-container central">
        {user.follows.length === 0 && !category ? (
          <p></p>
        ) : (
          user.follows.map(
            (talent) =>
              talent.profile.category &&
              talent.profile.category === category &&
              talent._id !== user._id && (
                <TalentCard key={talent._id} talent={talent} user={user} />
              )
          )
        )}
        {!category &&
          user.follows.map(
            (talent) =>
              talent._id !== user._id && (
                <TalentCard key={talent._id} talent={talent} user={user} />
              )
          )}
      </div>

      <div className="bo-DARK"></div>
      <div className="mb1 central">
        <h4 className={`central ${color} mt05`}>discover new talents</h4>
      </div>
      <div className="talent-container mb2">
        {talents &&
          talents.map(
            (talent) =>
              !user.follows.find((follow) => follow._id === talent._id) &&
              talent._id !== user._id &&
              talent.profile.category &&
              talent.profile.category === category && (
                <TalentCard key={talent._id} talent={talent} user={user} />
              )
          )}
        {!category &&
          talents?.map(
            (talent) =>
              !user.follows.find((follow) => follow._id === talent._id) &&
              talent._id !== user._id && (
                <TalentCard key={talent._id} talent={talent} user={user} />
              )
          )}
      </div>
      <Footer/>
    </>
  );
};

export default Community;
