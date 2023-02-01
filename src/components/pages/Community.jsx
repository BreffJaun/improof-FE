import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import Footer from "../elements/Footer.jsx";
import Newsfeed from "../elements/Newsfeed.jsx";
import TalentCard from "../elements/TalentCard.jsx";

const Community = () => {
  return (
    <>
      <div className="mb2 mt2">
        <Newsfeed/>
        <p className="sl c-FAV">categories</p>
        <CategoriesFilter/>
      </div>
      <div className="x mb2 mt2">
        <p>menu talent || menu recruiter</p>
      </div>

      <h1 className="c-FAV mb2">community</h1>
      <div className="mb2 mt2">
        <p className="sl c-FAV">i follow</p>
        <CategoriesFilter/>
      </div>

      <div className="mb2 mt2">
        <p className="sl c-FAV">meet new talents</p>
        <CategoriesFilter/>
      </div>
      <TalentCard/>
      <Footer/>
    </>
  );
};

export default Community;