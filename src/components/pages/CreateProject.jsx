// COMPONENTS
import CategoriesFilter from "../elements/CategoriesFilter.jsx";
import RadioPrivacy from "../buttons/RadioPrivacy"
import { RadioProjectColor } from "../buttons/RadioColor.jsx";
import Footer from "../elements/Footer.jsx";


const CreateProject = () => {
  return (
    <>
      <h1 className="central c-FAV mt1 mb2">new project</h1>

      <form>
        <div className="central col pa1 mb2">
          <div className="col">
            <p>project name<span className="c-FAV">*</span></p>
            <input 
              type="text" 
              name="name" 
            />
          </div>

          <div className="col">
            <p>description<span className="c-FAV">*</span></p>
            <input 
              type="text" 
              name="name" 
            />
          </div>

          <div className="col">
            <p>thumbnail</p>
            <div className="thumbnailS">
              <p>upload</p>
            </div>
          </div>

          <div className="col central">
            <p>project color</p>
            <RadioProjectColor />
          </div>

          <div className="col">
            <p>category<span className="c-FAV">*</span></p>
            < CategoriesFilter />
          </div>
        </div>

        <div className="bo-DARK"></div>
        <h1 className="central c-FAV mb2">create your team</h1>

        <div className="bo-DARK"></div>
        <h1 className="central c-FAV mb2">invite others</h1>

        <div className="bo-DARK"></div>
        <RadioPrivacy/>

        <div className="col">
          <div className="bo-DARK col"></div>
          <button className="bg-FAV">create your project</button>
        </div>

      </form>

      <Footer/>
    </>
  );
};

export default CreateProject;