import React from "react";

// logo
import logoALERT from "../../images/improof_ALERT.png";

const ConfirmBox = (props) => {
  const { title, message, onConfirm, onCancel, darkMode, bg = { bg } } = props;

  return (
    <div className={darkMode ? "confirm-box-dark" : "confirm-box-light"}>
      <img src={logoALERT} alt="logo" width="15" />
      <div className="confirm-box__title">{title}</div>
      <div className="confirm-box__message">{message}</div>
      <div className="confirm-box__buttons">
        <button className="bg-alert dangerzone" onClick={onConfirm}>
          Delete
        </button>
        <button className={`bg-fav ${bg}`} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmBox;
