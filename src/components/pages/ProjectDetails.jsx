import { Chrono } from "react-chrono";
import {GiStoneSphere as Stepstone} from "react-icons/gi"
import Footer from "../elements/Footer.jsx";

const ProjectDetails = () => {

  const items = [{
    title: Date.now(),
    cardTitle: "Stepstone",
    cardSubtitle:"Timeline",
    cardDetailedText: "today if build this Timeline with react Chrono",
  }, 
  {
    title: Date.now(),
    cardTitle: "Milestone",
    cardSubtitle:"title",
    cardDetailedText: "Description",
    media: {
      type: "IMAGE",
      source: {
        url: "https://www.downloadclipart.net/thumb/9394-stone-1-vector-thumb.png"
      }
    }
  }];

  return (
    <div className="componente">
      <div>
        <img src="https://www.downloadclipart.net/thumb/9394-stone-1-vector-thumb.png" alt="Thumbnail" />
        <h1>Project Name</h1>
        <p>description</p>
      </div>
      
     <Chrono items={items}/>
      <h1>Project Team</h1>
     <div>
      <div>
        <img src="https://www.downloadclipart.net/thumb/9394-stone-1-vector-thumb.png" alt="" />
        <h5>NAME</h5>
        <h4>current Position</h4>
      </div>
      <div>
        <img src="https://www.downloadclipart.net/thumb/9394-stone-1-vector-thumb.png" alt="" />
        <h5>NAME</h5>
        <h4>current Position</h4>
      </div>
      <div>
        <img src="https://www.downloadclipart.net/thumb/9394-stone-1-vector-thumb.png" alt="" />
        <h5>NAME</h5>
        <h4>current Position</h4>
      </div>
     </div>
     <Footer/>
    </div>
  );
};

export default ProjectDetails;