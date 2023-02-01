import "../../styles/cards.scss"
import "../../styles/colors.scss"

// ICONS
import {RxCross2} from "react-icons/rx"
import {HiPlus} from "react-icons/hi"
import {FiSend} from "react-icons/fi"


const TalentCardFollow = () => {
  return (
    <div className="card talent flex">
      <div className="talent-circle bg-FAV"></div>
      <div>
        <p className="c-FAV">talent name</p>
        <p className="c-A20">current position</p>
      </div>
      <div className="flex">
        <button className="action"><FiSend /></button>
        <button className="action"><RxCross2 /></button>
      </div>
    </div>
  );
};

const TalentCardAdd = () => {
  return (
    <div className="card talent flex">
      <div className="talent-circle bg-FAV"></div>
      <div>
        <p className="c-FAV">talent name</p>
        <p className="c-A20">current position</p>
      </div>
      <div className="flex">
        <button className="action"><FiSend /></button>
        <button className="action"><HiPlus /></button>
      </div>
    </div>
  );
};

export {TalentCardFollow, TalentCardAdd};