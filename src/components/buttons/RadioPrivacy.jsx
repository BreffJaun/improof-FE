const RadioPrivacy = ({setPrivacy}) => {

  const handlePrivacy = (event) => {
    setPrivacy(event.target.value)
  }

  return (
    <>
      <div className="central g1">
        <div className="mb05 g05">
          <label className="ml05">privat</label>
            <input
              type="radio"
              name="privacy"
              value="true"
              onChange={handlePrivacy}
            />
        </div>
        <div className="mb05 g05">
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