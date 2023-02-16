const RadioTalentColor = ({setFavColor}) => {

  const handleColor = (event) => {
    const favCol = event.target.value.split(",") 
    setFavColor(favCol)
    console.log(favCol);
    console.log(event.target.value)
  }  
  
  return (
    <div className="flex central mt05 mb05 colorCard">
      <div className="circle20 bg-gDB">
        <input
          type="radio"
          name="TalCol"
          value="c-DB2,bg-gDB"
          onChange={handleColor}>
        </input>
      </div>
      <div className="circle20 bg-gLB">
        <input
          type="radio"
          name="TalCol"
          value="c-LB2,bg-gLB"
          onChange={handleColor}>
        </input>
      </div>
      <div className="circle20 bg-gO">
        <input
          type="radio"
          name="TalCol"
          value="c-O2,bg-gO"
          onChange={handleColor}>
        </input>
      </div>
      <div className="circle20 bg-gPI">
        <input
          type="radio"
          name="TalCol"
          value="c-PI1,bg-gPI"
          onChange={handleColor}>
        </input>
      </div>
      <div className="circle20 bg-gPU">
        <input
          type="radio"
          name="TalCol"
          value="c-PU1,bg-gPU"
          onChange={handleColor}>
        </input>
      </div>
    </div>
  );
};



const RadioProjectColor = ({setFavColor}) => {

  const handleColor = (event) => {
    const favCol = event.target.value.split(",") 
    setFavColor(favCol)
    console.log(favCol);
    console.log(event.target.value)
  }

/* 
          HOW TO USE IT? 
          const [favColor, setFavColor] = useState("")
          <RadioColor user={talent} setFavColor={setFavColor} /> 
*/
const RadioColor = ({setFavColor, user}) => {

  const isTalent = user.profile.isTalent

  const handleColor = (event) => {
    const favCol = event.target.value.split(",") 
    setFavColor(favCol)
  }  
  
  return (
    <div className="flex central mt05 mb05 colorCard">
      <div className={isTalent ? "circle20 bg-gDB" : "circle20 bg-gGR1"}>
        <input
          type="radio"
          name="color"
          value="c-DB2,bg-gDB"
          onChange={handleColor}>
          value={isTalent ? "c-DB2,bg-gDB" : "c-GR1,bg-gGR1"}
          onChange={handleColor}>
        </input>
      </div>
      <div className={isTalent ? "circle20 bg-gLB" : "circle20 bg-gGR3"}>
        <input
          type="radio"
          value={isTalent ? "c-LB2,bg-gLB" : "c-GR3,bg-gGR3"}
          onChange={handleColor}>
        </input>
      </div>
      <div className={isTalent ? "circle20 bg-gO" : "circle20 bg-gGR5"}>
        <input
          type="radio"
          value={isTalent ? "c-O2,bg-gO" : "c-GR5,bg-gGR5"}
          onChange={handleColor}>
        </input>
      </div>
      {isTalent && 
      <>
      <div className="circle20 bg-gPI">
        <input
          type="radio"
          value="c-PI1,bg-gPI"
          onChange={handleColor}>
        </input>
      </div>
      <div className="circle20 bg-gPU">
        <input
          type="radio"
          value="c-PU1,bg-gPU"
          onChange={handleColor}>
        </input>
      </div>      
      </>
      }
    </div>
  );
};

export { RadioColor };