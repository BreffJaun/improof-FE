import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import Footer from "../elements/Footer.jsx";
import Newsfeed from "../elements/Newsfeed.jsx";
import {TalentCardFollow, TalentCardAdd} from "../elements/TalentCard.jsx";

const Community = () => {
  return (
    <>
      <div className="mb2 mt2">
        <Newsfeed/>
        <CategoriesFilter/>
      </div>
      
      <div className="bo-DARK"></div>

      <h1 className="c-FAV mb2">community</h1>
      <div className="mb2 mt2">
        <p className="sl c-FAV">i follow</p>
        <CategoriesFilter/>
      </div>
      
      <TalentCardFollow/>
      <TalentCardFollow/>
      <TalentCardFollow/>

      <div className="bo-DARK"></div>

      <div className="mb2 mt2">
        <p className="sl c-FAV">meet new talents</p>
        <CategoriesFilter/>
      </div>
      <TalentCardAdd/>
      <TalentCardAdd/>
      <TalentCardAdd/>

      <Footer/>
    </>
  );
};

export default Community;