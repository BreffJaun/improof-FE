import { FaLinkedinIn as LinkedIn } from "react-icons/fa";
import { FaXing as Xing } from "react-icons/fa";
import { AiFillGithub as GitHub } from "react-icons/ai";
import { TbWorld as Website } from "react-icons/tb";

import eleni from "../../images/avatars/eleni.png";

const Eleni = ({ darkMode }) => {
  return (
    <>
      <div
        className={
          darkMode ? "card efjm-card rel col bgG" : "card efjm-card rel col bgL"
        }
      >
        <div className="central mb2">
          <div className="efjm-avatar-container central">
            <img src={eleni} />
          </div>
          <div className="mt5 col">
            <h3 className="c-PI15 center mb05">Eleni Orfanou</h3>
            <p className="c-A60">"Life is not static, life is ecstatic!"</p>
          </div>
        </div>
        <div className="efjm-body">
          <div className="col mb1">
            <p className="fw700 c-PI15">My field:</p>
            <p>
              {" "}
              HTML | CSS3 | JavaScript | React.js | MongoDB | Express | Node.js
            </p>
          </div>
          <div className="col mb1">
            <p className="fw700 c-PI15">About me:</p>
            <p>
              Hi, I’m Eleni
              <br />
              I am a passionate web developer in progress
              <br />
              I’m interested in expanding my knowledge and getting involved in
              challenging projects!
              <br /> I’m currently learning the MERN stack.
            </p>
          </div>
        </div>
        <div>
          <div className="contact mt15 mb15">
            <button className="efjm-icon circle30">
              <a
                href="https://www.linkedin.com/in/eleniorfanou"
                target="_blank"
                className="c-PI15"
              >
                <LinkedIn />
              </a>
            </button>
            <button className="efjm-icon circle30">
              <a
                href="https://www.xing.com/profile/eleni_orfanou3/cv"
                target="_blank"
                className="c-PI15"
              >
                <Xing />
              </a>
            </button>
            <button className="efjm-icon circle30">
              <div className="fs15">
                <a
                  href="https://github.com/elenosis"
                  target="_blank"
                  className="c-PI15"
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

export default Eleni;
