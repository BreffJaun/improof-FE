import AvatarL from "../elements/Avatar.jsx";
import { ColorCardRecruiter, ColorCardTalent } from "../elements/ColorCard.jsx";
import { MyProjectCard } from "../elements/ProjectCard.jsx";
import { TalentCard } from "../elements/TalentCard.jsx";

import { useContext } from "react";

import Footer from "../elements/Footer.jsx";

// CONTEXT
import UserContext from "../../context/userContext.jsx";




const MyProfil = () => {
  const [user, setUser] = useContext(UserContext)
  console.log(user);

  return (
    <div className="mb2 mt2">

      <>
        {/* talentprofil */}
        <div className="bo-DARK"></div>
        <AvatarL />
        <h1 className="central c-FAV mt2 mb2">
          {user.profile.firstName} {user.profile.lastName}
        </h1>
        <div>
          <p className="c-FAV">that's me:</p>
          <p>{user.profile.description}</p>
          <div className="central">
            <button className="circle60 bg-FAV">follow</button>
            <button className="circle60 bg-FAV">message</button>
          </div>
        </div>

        <div className="bo-DARK"></div>
        <h1 className="central c-FAV mb2">my projects:</h1>
        {!user.myProjects ? 
          <p>It's time for your first project!</p> :
          user?.myProjects.map(project => <MyProjectCard project={project}/>)
        }

        <div className="bo-DARK"></div>
        <h1 className="central c-FAV mb05">i follow:</h1>
        <p className="c-FAV mb2 central">{user.follows.length} talents</p>
        {user.follows.map(talent => <TalentCard user={user} talent={talent} />)}

        <div className="bo-DARK"></div>
        <h1 className="central c-FAV mb05">contact</h1>
        <button className="central bg-FAV" >click here</button>
      </>


      <>
        {/* recruiterprofil */}
        <AvatarL/>
        <ColorCardTalent/>
        <h1 className="central c-FAV mb2">username</h1>
        <div>
          <p className="c-FAV">that's me:</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, aliquam.</p>
          <button>read more</button>
        </div>

        <div className="bo-DARK"></div>
          <h1 className="central c-FAV mb05">contact</h1>
        {/* <button className="central bg-FAV" onClick={handleShowContent} >click here</button> */}
      </>

      <>
        {/* talentprofil */}
        <AvatarL/>
        <ColorCardRecruiter/>
      </>
      


      
      


      
      <Footer/>
    </div>
  );
};

export default MyProfil;