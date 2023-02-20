import { useState, useContext, useEffect } from "react";
import UserContext from "../../context/userContext.jsx";


const RadioPrivacy = ({ setPrivacy }) => {
  const [user, setUser] = useContext(UserContext);
  const color = user.meta.colorTheme[0]
  const bg = user.meta.colorTheme[1]

  const handlePrivacy = (event) => {
    setPrivacy(event.target.value)
  }

  return (
    <>
      <div className="central g2">
        <div className="flex mb05 g05">
          <label className="ml05">privat</label>
          <input
            type="radio"
            name="privacy"
            value="true"
            onChange={handlePrivacy}
          />
        </div>
        <div className="flex mb05 g05">
          <input
            type="radio"
            name="privacy"
            value="false"
            checked="checked"
            onChange={handlePrivacy}
          />
          <label className="ml05">public</label>
        </div>
    </div>
    </>
  );
};

export default RadioPrivacy;