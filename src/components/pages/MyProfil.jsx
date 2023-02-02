import Footer from "../elements/Footer.jsx";
import { ColorCardRecruiter, ColorCardTalent } from "../elements/ColorCard.jsx";
import { GiThreeFriends } from "react-icons/gi";
import { TalentCardFollow } from "../elements/TalentCard.jsx";
import AvatarL from "../elements/Avatar.jsx";

const user = {friends:[
  {name:"UWE", currentPosition:"WebDev", initials:"UK" , img:"https://streunerglueck.de/wp-content/uploads/2020/04/Katzen1.jpg"},
  {name:"UWE", currentPosition:"WebDev", initials:"UK" },
  {name:"UWE", currentPosition:"WebDev", initials:"UK"}
]}

const MyProfil = () => {
  return (
    <div className="mb2 mt2">
      <h1 className="central c-FAV mb2">username</h1>

      <>
        {/* talentprofil */}
        <AvatarL/>
        <ColorCardTalent/>
        <div>
          <p className="c-FAV">that's me:</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, aliquam.</p>
          <button>read more</button>
        </div>
        <div className="bo-DARK"></div>

      </>


      <>
        {/* talentprofil */}
        <AvatarL/>
        <ColorCardRecruiter/>
      </>
      


      
      

      {user.friends.map(friend => <TalentCardFollow name={friend.name} position={friend.currentPosition} img={friend.img} initials={friend.initials} />)}
      
      <Footer/>
    </div>
  );
};

export default MyProfil;