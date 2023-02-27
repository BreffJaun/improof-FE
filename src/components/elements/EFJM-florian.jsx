import { FaLinkedinIn as LinkedIn } from "react-icons/fa";
import { FaXing as Xing } from "react-icons/fa";
import { AiFillGithub as GitHub } from "react-icons/ai";
import { TbWorld as Website } from "react-icons/tb";
import img from "../../images/avatars/Florian.jpg";

const Florian = ({ darkMode }) => {
  return (
    <>
      <div
        className={
          darkMode ? "card efjm-card rel col bgG" : "card efjm-card rel col"
        }
      >
        <div className="central mb2">
          <div className="efjm-avatar-container bg-FAV central">
            <img src={img} alt="avatar" />
          </div>
          <div className="mt5 col">
            <h3 className="c-PU2 center mb05">Florian Mewes</h3>
            <p className="c-A60">"insert your slogan here!"</p>
          </div>
        </div>
        <div>
          <div className="col mb1">
            <p className="c-PU2">My field:</p>
            <p>rocks React, loves Frontend and rules JavaScript</p>
          </div>
          <div className="col mb1">
            <p className="c-PU2">About me:</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores magni, quibusdam omnis alias illum quos!
            </p>
          </div>
        </div>
        <div>
          <div className="contact mt15 mb15">
            <button className="efjm-icon circle30">
              <a
                href="https://www.linkedin.com/in/florian-mewes-947649240/"
                target="_blank"
                className="c-PU2"
              >
                <LinkedIn />
              </a>
            </button>
            <button className="efjm-icon circle30">
              <div className="fs15">
                <a
                  href="https://github.com/itzFlorian"
                  target="_blank"
                  className="c-PU2"
                >
                  <GitHub />
                </a>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Florian;
