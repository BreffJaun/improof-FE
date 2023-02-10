const RadioTalentColor = () => {
  const handleTalentColor = (event) => {
    console.log(event.target.value)
  }
  return (
    <div className="flex central mt05 mb05 colorCard">
      <div className="circle20 bg-gDB">
        <input
          type="radio"
          name="TalCol"
          value="className='........deepblue'"
          onChange={handleTalentColor}>
        </input>
      </div>
      <div className="circle20 bg-gLB">
        <input
          type="radio"
          name="TalCol"
          value="className='........lightblue'"
          onChange={handleTalentColor}>
        </input>
      </div>
      <div className="circle20 bg-gO">
        <input
          type="radio"
          name="TalCol"
          value="className='........orange'"
          onChange={handleTalentColor}>
        </input>
      </div>
      <div className="circle20 bg-gPI">
        <input
          type="radio"
          name="TalCol"
          value="className='........pink'"
          onChange={handleTalentColor}>
        </input>
      </div>
      <div className="circle20 bg-gPU">
        <input
          type="radio"
          name="TalCol"
          value="className='........purple'"
          onChange={handleTalentColor}>
        </input>
      </div>
    </div>
  );
};



const RadioProjectColor = ({setProjectColor}) => {
  const handleProjectColor = (event) => {
    setProjectColor(event.target.value)
  }
  return (
    <div className="flex central mt05 mb05 colorCard">
      <div className="circle20 bg-gDB">
        <input
          type="radio"
          name="color"
          value="deepblue"
          onChange={handleProjectColor}>
        </input>
      </div>
      <div className="circle20 bg-gLB">
        <input
          type="radio"
          name="color"
          value="lightblue"
          onChange={handleProjectColor}>
        </input>
      </div>
      <div className="circle20 bg-gO">
        <input
          type="radio"
          name="color"
          value="orange"
          onChange={handleProjectColor}>
        </input>
      </div>
      <div className="circle20 bg-gPI">
        <input
          type="radio"
          name="color"
          value="pink"
          onChange={handleProjectColor}>
        </input>
      </div>
      <div className="circle20 bg-gPU">
        <input
          type="radio"
          name="color"
          value="purple"
          onChange={handleProjectColor}>
        </input>
      </div>
    </div>
  );
};



const RadioRecruiterColor = () => {
  const handleRecruiterColor = (event) => {
    console.log(event.target.value)
  }
  return (
    <div className="flex central mt05 mb05 colorCard">
      <div className="circle20 bg-gGR1">
        <input
          type="radio"
          name="RecCol"
          value="className='........lightgreen'"
          onChange={handleRecruiterColor}>
        </input>
      </div>
      <div className="circle20 bg-gGR3">
        <input
          type="radio"
          name="RecCol"
          value="className='........green'"
          onChange={handleRecruiterColor}>
        </input>
      </div>
      <div className="circle20 bg-gGR5">
        <input
          type="radio"
          name="RecCol"
          value="className='........darkgreen'"
          onChange={handleRecruiterColor}>
        </input>
      </div>
    </div>
  );
};



export {RadioTalentColor, RadioProjectColor, RadioRecruiterColor};