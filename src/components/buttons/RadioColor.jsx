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