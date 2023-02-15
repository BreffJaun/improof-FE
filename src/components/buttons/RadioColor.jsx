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
          value="deepblue"
          onChange={handleTalentColor}>
        </input>
      </div>
      <div className="circle20 bg-gLB">
        <input
          type="radio"
          name="TalCol"
          value="lightblue"
          onChange={handleTalentColor}>
        </input>
      </div>
      <div className="circle20 bg-gO">
        <input
          type="radio"
          name="TalCol"
          value="orange"
          onChange={handleTalentColor}>
        </input>
      </div>
      <div className="circle20 bg-gPI">
        <input
          type="radio"
          name="TalCol"
          value="pink"
          onChange={handleTalentColor}>
        </input>
      </div>
      <div className="circle20 bg-gPU">
        <input
          type="radio"
          name="TalCol"
          value="purple"
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
          value="lightgreen'"
          onChange={handleRecruiterColor}>
        </input>
      </div>
      <div className="circle20 bg-gGR3">
        <input
          type="radio"
          name="RecCol"
          value="green"
          onChange={handleRecruiterColor}>
        </input>
      </div>
      <div className="circle20 bg-gGR5">
        <input
          type="radio"
          name="RecCol"
          value="darkgreen"
          onChange={handleRecruiterColor}>
        </input>
      </div>
    </div>
  );
};



export { RadioTalentColor, RadioProjectColor, RadioRecruiterColor };


/*

=================================

RadioTalentColor,
RadioProjectColor

- - - - - - - - - - - - - - - - -

"DEEPBLUE"
fontcolor = .c-DB2
background-gradient = .bg-gDB

- - - - - - - - - - - - - - - - -

"LIGHTBLUE"
fontcolor = .c-LB2
background-gradient = .bg-gLB

- - - - - - - - - - - - - - - - -

"ORANGE"
fontcolor = .c-O2
background-gradient = .bg-gO

- - - - - - - - - - - - - - - - -

"PINK"
fontcolor = .c-PI1
background-gradient = .bg-gPI

- - - - - - - - - - - - - - - - -

"PURPLE"
fontcolor = .c-PU1
background-gradient = .bg-gPU

=================================

RadioRecruiterColor

- - - - - - - - - - - - - - - - -

"LIGHTGREEN"
fontcolor = c-GR1
background-gradient = bg-gGR1

- - - - - - - - - - - - - - - - -

"GREEN"
fontcolor = c-GR3
background-gradient = bg-gGr3

- - - - - - - - - - - - - - - - -

"DARKGREEN"
fontcolor = c-GR5
background-gradient = bg-gGr5

=================================
*/