import { FaLinkedinIn as LinkedIn } from "react-icons/fa";
import { FaXing as Xing } from "react-icons/fa";
import { AiFillGithub as GitHub } from "react-icons/ai";
import { TbWorld as Website } from "react-icons/tb";

import Maddin from "../../images/avatars/mfgmg_s.png";

const Martin = ({ darkMode }) => {
  return (
    <>
      <div
        className={
          darkMode ? "card efjm-card rel col bgG" : "card efjm-card rel col bgL"
        }
      >
        {" "}
        <div className="central mb2">
          <div className="efjm-avatar-container central">
            <img src={Maddin} />
          </div>
          <div className="mt5 col">
            <h3 className="c-FAV center mb05">Martin Groß</h3>
            <p className="c-A60">"Everything is design!"</p>
          </div>
        </div>
        <div className="efjm-body">
          <div className="col mb1">
            <p className="fw700 c-FAV">My field:</p>
            <p>
              UI-Designer, loves UX, knows HTML, CSS, Sass, React, Id, Ps, Ai
            </p>
          </div>
          <div className="col mb1">
            <p className="fw700 c-FAV">About me:</p>
            <p>
              I am a designer with heart and soul and live for the visualization
              of ideas. I have been able to do this for over 16 years at
              magazines and newspapers in Europe's largest publishing house.
              Currently I am learning WebDev, so I can let off steam creatively
              in UI and frontend. And that's going to be fascinating.
            </p>
          </div>
        </div>
        <div>
          <div className="contact mt15 mb15">
            <button className="efjm-icon circle30">
              <a
                href="https://www.linkedin.com/in/martin-gro%C3%9F-003146255/"
                target="_blank"
                className="c-FAV"
              >
                <LinkedIn />
              </a>
            </button>
            <button className="efjm-icon circle30">
              <a
                href="https://www.xing.com/profile/Martin_Gross14/cv"
                target="_blank"
                className="c-FAV"
              >
                <Xing />
              </a>
            </button>
            <button className="efjm-icon circle30">
              <div className="fs15">
                <a
                  href="https://github.com/grossesbewirken"
                  target="_blank"
                  className="c-FAV"
                >
                  <GitHub />
                </a>
              </div>
            </button>
            <button className="efjm-icon circle30">
              <div className="fs15">
                <a
                  href="https://grossesbewirken.de/news.html"
                  target="_blank"
                  className="c-FAV"
                >
                  <Website />
                </a>
              </div>
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Martin;

// Ich bin mit Leib und Seele Designer und
// lebe für die Visualisierung von
// Ideen. Dies konnte ich über 16 Jahren
// Jahren bei Magazinen und
// Zeitungen in Europas größtem
// Verlagshaus ausleben.
// Derzeit lerne ich WebDev,
// damit ich mich kreativ im UI und Frontend austoben kann. Und das wird faszinierend werden.
