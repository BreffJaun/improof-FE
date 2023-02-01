import "../../styles/cards.scss"
import "../../styles/colors.scss"

// ICONS
import {RxCross2} from "react-icons/rx"
import {HiPlus} from "react-icons/hi"



const ProjectCardFollow = () => {
  return (
    <div className="project card">
      <div className="x bg-FAV"></div>

      <div className="col">
        <p className="x c-FAV">project name</p>
        <p className="y c-A20">description Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, et!</p>
      </div>
      <button className="action"><RxCross2 /></button>
    </div>
  );
};


export {ProjectCardFollow};