import { useState, useEffect, useContext } from "react";
import { host } from "../../api/host.jsx";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../elements/Footer.jsx";

// ICONS
import { BiCheck } from "react-icons/bi";
import { SlTrash } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";

const CreateStone = () => {
  const [newStone, setNewStone] = useState({});

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    theme: "dark",
  };
  const handleInput = () => {};
  const handleSubmit = () => {};
  return (
    <>
      <h1 className="central c-FAV mt1 mb2">new stone</h1>

      <form onSubmit={handleSubmit}>
        <div className="central col pa1 mb2">
          <div className="col">
            <p>
              {" "}
              title <span className="c-FAV">*</span>
            </p>
            <input
              type="text"
              name="title"
              placeholder="stone's title"
              required
              onChange={handleInput}
            />
          </div>

          <div className="col">
            <p>description</p>
            <input
              type="text"
              name="description"
              placeholder="stone description"
              onChange={handleInput}
            />
          </div>

          <div>
            <input
              type="radio"
              name="stoneType"
              value="stepstone"
              onChange={handleInput}
            />
            <label for="stoneType">stepstone</label>
            <input type="radio" name="stoneType" value="milestone" />
            <label for="stoneType">milestone</label>
            <input type="radio" name="stoneType" value="endstone" />
            <label for="stoneType">endstone</label>
          </div>
          <hr />
          <div>
            <div className="col">
              <p> add media</p>
              <input type="text" />
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CreateStone;
