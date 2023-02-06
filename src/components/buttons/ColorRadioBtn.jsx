const ColorTalentProject = () => {

  const handleTalProCol = (event) => {
    console.log(event.target.value)
  }

  return (
    <div className="flex central mt05 mb05 colorCard">

      <div className="circle20 bg-gDB">
        <input
          type="radio"
          name="TalProCol"
          value="var(--DB2)"
          onChange={handleTalProCol}
        >
        </input>
      </div>

      <div className="circle20 bg-gLB">
        <input
          type="radio"
          name="TalProCol"
          value="var(--LB2)"
          onChange={handleTalProCol}
        >
        </input>
      </div>

      <div className="circle20 bg-gO">
        <input
          type="radio"
          name="TalProCol"
          value="var(--O15)"
          onChange={handleTalProCol}
        >
        </input>
      </div>

      <div className="circle20 bg-gPI">
        <input
          type="radio"
          name="TalProCol"
          value="var(--PI2)"
          onChange={handleTalProCol}
        >
        </input>
      </div>

      <div className="circle20 bg-gPU">
        <input
          type="radio"
          name="TalProCol"
          value="var(--PU2)"
          onChange={handleTalProCol}
        >
        </input>
      </div>
      
    </div>
  );
};



const ColorRecruiter = () => {
  return (
    <div className="flex central mt05 mb05">
      <div className="circle20 bg-gGR1"></div>
      <div className="circle20 bg-gGR2"></div>
      <div className="circle20 bg-gGR3"></div>
      <div className="circle20 bg-gGR4"></div>
      <div className="circle20 bg-gGR5"></div>
    </div>
  );
};

export {ColorTalentProject};