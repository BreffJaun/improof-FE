import { FaLinkedinIn as LinkedIn } from "react-icons/fa";
import { FaXing as Xing } from "react-icons/fa";
import { AiFillGithub as GitHub } from "react-icons/ai";
import { TbWorld as Website } from "react-icons/tb";

import jeff from "../../images/avatars/jeff.png";

const Jeff = ({ darkMode }) => {
  return (
    <>
      <div
        className={
          darkMode ? "card efjm-card rel col bgG" : "card efjm-card rel col"
        }
      >
        {" "}
        <div className="central mb2">
          <div className="efjm-avatar-container bg-gGR1 central">
            <img src={jeff} />
          </div>
          <div className="mt5 col">
            <h3 className="c-GR1 center mb05">Jeff Braun</h3>
            <p className="c-A60">"Learning from my own and especially from the mistakes of others"</p>
          </div>
        </div>
        <div>
          <div className="col mb1">
            <p className="c-GR1">My field:</p>
            <p>In this project my main task was the structuring and programming of the backend from scratch. For this we used my backend template, which already served us well in our project "coffy paste". Together with Eleni we programmed the backend with all its components within one week. After that we only had to add changes or extensions to a stable running backend.

            After the completion of the backend I supported the frontend team around Martin and Florian. Among other things, I created the "new Search" on the recruiter page, as well as various other components.</p>
          </div>
          <div className="col mb1">
            <p className="c-GR1">About me:</p>
            <p>
            I'm Jeff Braun, 32 years old and I'm a full stack developer (MERN stack) from Germany with a soft spot for the backend.

            Currently i am finishing my advanced training as a Web Developer, at DCI, where I am also the class representative for our class, as well as one of the tutors.

            I'm looking forward to deepening my knowledge in the future and to many more exciting projects.
            </p>
          </div>
        </div>
        <div>
          <div className="contact mt15 mb15">
            <button className="efjm-icon circle30">
              <a
                href="https://www.linkedin.com/in/jeff-braun-0959091a4/"
                target="_blank"
                className="c-GR1"
              >
                <LinkedIn />
              </a>
            </button>
            <button className="efjm-icon circle30">
              <a
                href="https://www.xing.com/profile/Jeff_Braun2/cv"
                target="_blank"
                className="c-GR1"
              >
                <Xing />
              </a>
            </button>
            <button className="efjm-icon circle30">
              <div className="fs15">
                <a
                  href="https://github.com/BreffJaun"
                  target="_blank"
                  className="c-GR1"
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

export default Jeff;
