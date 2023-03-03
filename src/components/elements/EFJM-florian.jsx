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
          darkMode ? "card efjm-card rel col bgG" : "card efjm-card rel col bgL"
        }
      >
        <div className="mb2">
          <div className="efjm-avatar-container central">
            <img src={img} alt="avatar" />
          </div>
          <div className="mt5 col">
            <h3 className="c-PU2 center mb05">Florian Mewes</h3>
            <p className="c-A60">"Jesus loves coding"</p>
          </div>
        </div>
        <div className="efjm-body">
          <div className="co l mb1">
            <p className="fw700 c-PU2">My field:</p>
            <p>rocks React, loves Frontend and rules JavaScript</p>
          </div>
          <div className="col mb1">
            <p className="fw700 c-PU2">About me:</p>
            <p>
              Im here im there. Im everywhere...
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
