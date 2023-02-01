import Footer from "../elements/Footer.jsx";
import { ColorCardRecruiter, ColorCardTalent } from "../elements/ColorCard.jsx";


const MyProfil = () => {
  return (
    <div className="mb2 mt2">
      <h1 className="central c-FAV mb2">my profil</h1>
      <ColorCardTalent/>
      <ColorCardRecruiter/>
      <Footer/>
    </div>
  );
};

export default MyProfil;