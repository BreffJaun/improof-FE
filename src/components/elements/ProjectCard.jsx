import "../../styles/cards.scss"
import "../../styles/colors.scss"
import "../../styles/banner.scss"


// ICONS
import {RxCross2} from "react-icons/rx"
import {HiPlus} from "react-icons/hi"



const ProjectCardFollow = () => {
  return (
    <div className="project card col">
      <div className="project-banner bg-FAV"></div>
      <div className="project-body">
        <div>
          <p className="c-FAV">project name</p>
          <p className="c-A20">description Lorem ipsum dolor sit amet consectetur </p>
        </div>
        <button className="action"><RxCross2 /></button>
      </div>
    </div>
  );
};

const ProjectFollow = () => {
  return (
    <div className="project card col">
      <div className="project-body">
        <div>
          <p className="c-FAV">project name</p>
          <p className="c-A20">description Lorem ipsum dolor sit amet consectetur </p>
        </div>
        <button className="action"><RxCross2 /></button>
      </div>
    </div>
  );
};



const ProjectCardAdd = () => {
  return (
    <div className="project card col">
      <div className="project-banner bg-FAV"></div>
      <div className="project-body">
        <div>
          <p className="c-FAV">project name</p>
          <p className="c-A20">description Lorem ipsum dolor sit amet consectetur </p>
        </div>
        <button className="action"><HiPlus /></button>
      </div>
    </div>
  );
};

const ProjectAdd = () => {
  return (
    <div className="project card col">
      <div className="project-body">
        <div>
          <p className="c-FAV">project name</p>
          <p className="c-A20">description Lorem ipsum dolor sit amet consectetur </p>
        </div>
        <button className="action"><HiPlus /></button>
      </div>
    </div>
  );
};



const MyProjectCard = () => {
  return (
    <div className="project card col">
      <div className="project-banner bg-FAV"></div>
      <div className="project-body">
        <div>
          <div>
            <p className="c-FAV">project name</p>
            <p className="c-A20 mt05">description Lorem ipsum dolor sit amet consectetur </p>
          </div>
          <div className="mt15">
            <p className="c-FAV">contributors:</p>
            <div className="flex mt05">
              <div className="circle40 bg-FAV mr05"></div>
              <div className="circle40 bg-FAV mr05"></div>
              <div className="circle40 bg-FAV mr05"></div>
              <div className="circle40 bg-FAV mr05"></div>
            </div>
          </div>
          <div className="mt15">
            <p className="c-FAV">status:</p>
            <p className="c-A20 mt">open</p>
          </div>
        </div>

        <div className="col">
          <button className="action"><RxCross2 /></button>
          <p>delete</p>
        </div>

      </div>
    </div>
  );
};



export {ProjectCardFollow, ProjectCardAdd, ProjectFollow, ProjectAdd, MyProjectCard};