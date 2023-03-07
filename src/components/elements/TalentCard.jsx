import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { ToastContainer } from "react-toastify";

// STYLES
import "../../styles/cards.scss";
import "../../styles/colors.scss";
import "../../styles/talentcard.scss";

// ICONS

// ELEMENTS
import { FollowBtn } from "../buttons/FollowBtn.jsx";
import { SendMessageBtn } from "../buttons/MessageBtn.jsx";

const TalentCard = ({ talent, user }) => {
  const color = talent.meta.colorTheme[0];
  const bg = talent.meta.colorTheme[1];
  const darkMode = user.meta.darkMode;
  const theme = darkMode ? "dark" : "light";
  const navigate = useNavigate();
  return (
    <>
      <div className="t-card">
        <div className="t-avatar">
          <div
            className={`${bg} central t-pic`}
            onClick={() => navigate(`/userDetails/${talent._id}`)}
          >
            {talent?.profile?.avatar ? (
              <img src={talent.profile?.avatar} />
            ) : (
              <p className="initials">{talent.profile?.initials}</p>
            )}
          </div>
        </div>
        <div className="t-info">
          <h4
            className={`fw900 ${color}`}
            onClick={() => navigate(`/userDetails/${talent._id}`)}
          >
            {talent.profile?.firstName} {talent.profile?.lastName}
          </h4>
          <p>{talent.profile?.category}</p>
          <p className={`mt1 info c-A50`}>tools and skills </p>
          <p>{talent.profile?.toolsAndSkills}</p>
        </div>

        {user._id === talent._id ? null : (
          <div className="t-community">
            <div title="send message">
              <SendMessageBtn talent={talent} user={user} />
            </div>
            <div>
              {user.follows.find((follow) => follow._id === talent._id) ? (
                <FollowBtn talent={talent} user={user} theme={theme} />
              ) : (
                <FollowBtn talent={talent} user={user} theme={theme} />
              )}
            </div>
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}
    </>
  );
};

const TalentCardS = ({ talent, user, theme }) => {
  const color = talent.meta.colorTheme[0];
  const bg = talent.meta.colorTheme[1];
  const navigate = useNavigate();
  return (
    <>
      <div className="t-cardS col mt1">
        <div className="mt1 mb2 row">
          <div
            className={`${bg} t-picS  central`}
            onClick={() => navigate(`/userDetails/${talent._id}`)}
          >
            {talent?.profile?.avatar ? (
              <img src={talent.profile?.avatar} />
            ) : (
              <p className="initials central">{talent.profile?.initials}</p>
            )}
          </div>

          <div className="">
            <p
              className={`fw500 ${color}`}
              onClick={() => navigate(`/userDetails/${talent._id}`)}
            >
              {talent.profile?.firstName} {talent.profile?.lastName}
            </p>
            <p className="info fw500">{talent.profile?.category}</p>
          </div>
        </div>
      </div>
    </>
  );
};

const TalentCardContact = ({ talent, user, theme }) => {
  const color = talent.meta.colorTheme[0];
  const bg = talent.meta.colorTheme[1];
  const navigate = useNavigate();
  return (
    <>
      <div className="t-cardSstone col  mt1">
        <div className="mt1 mb2 row">
          <div
            className={`${bg} t-picS  `}
            onClick={() => navigate(`/userDetails/${talent._id}`)}
          >
            {talent?.profile?.avatar ? (
              <img src={talent.profile?.avatar} />
            ) : (
              <p className="initials central">{talent.profile?.initials}</p>
            )}
          </div>

          <div className="">
            <p
              className={`fw500 ${color}`}
              onClick={() => navigate(`/userDetails/${talent._id}`)}
            >
              {talent.profile?.firstName} {talent.profile?.lastName}
            </p>
            <p className="info fw500">{talent.profile?.category}</p>
          </div>
          {user._id === talent._id ? null : (
            <div className="ml1 row">
              <div title="send message">
                <SendMessageBtn talent={talent} user={user} />
              </div>
              <div>
                {user.follows.find((follow) => follow._id === talent._id) ? (
                  <FollowBtn talent={talent} user={user} theme={theme} />
                ) : (
                  <FollowBtn talent={talent} user={user} theme={theme} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const TalentCardStones = ({
  talent,
  user,
  contributors,
  handleContributor,
}) => {
  const color = talent.meta.colorTheme[0];
  const bg = talent.meta.colorTheme[1];
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
  };
  const navigate = useNavigate();
  return (
    <>
      <div className="t-cardS  col mt1">
        <div className=" mt1 mb2 row">
          <div className={`${bg} t-picS central`}>
            {talent?.profile?.avatar ? (
              <img src={talent.profile?.avatar} />
            ) : (
              <p className="initials central">{talent.profile?.initials}</p>
            )}
          </div>

          <div>
            <p className={`fw500 ${color}`}>
              {talent.profile?.firstName} {talent.profile?.lastName}
            </p>
            <p>{talent.profile?.category}</p>
          </div>

          <div className="ml1 row">
            <Switch
              checked={contributors.includes(talent._id)}
              onChange={() => handleContributor(talent._id)}
              onColor="#9AA5BB"
              onHandleColor="#3C465F"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={48}
              className="react-switch "
              id="material-switch"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { TalentCard, TalentCardS, TalentCardStones, TalentCardContact };
