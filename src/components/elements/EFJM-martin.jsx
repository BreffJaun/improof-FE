import { FaLinkedinIn as LinkedIn } from "react-icons/fa"
import { FaXing as Xing } from "react-icons/fa"
import { AiFillGithub as GitHub } from "react-icons/ai"
import { TbWorld as Website} from "react-icons/tb"


import Maddin from "../../images/avatars/mfgmg_s.png"


const Martin = () => {
    return (
        <>
            <div className="card efjm-card rel col">
                <div className="central mb2">
                    <div className="efjm-avatar-container bg-gPU central">
                        <img src={Maddin}/>
                    </div>
                    <div className="mt5 col">
                        <h3 className="c-PU1 center mb05">Martin Groß</h3>
                        <p className="c-A60">"Everything is design!"</p>
                    </div>
                </div>
                <div>
                    <div className="col mb1">
                        <p className="c-PU1">Mein Bereich:</p>
                        <p>UI-Designer, loves UX, knows HTML, CSS, Sass, React, Id, Ps, Ai</p>
                    </div>
                    <div className="col mb1">
                        <p className="c-PU1">Meine Stärken</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magni, quibusdam omnis alias illum quos!</p>
                    </div>
                </div>
                <div>
                    <div className="contact mt15 mb15">
                        <button className="efjm-icon circle30">
                            <a href="https://www.linkedin.com/in/martin-gro%C3%9F-003146255/" target="_blank">
                                <LinkedIn />
                            </a>
                        </button>
                        <button className="efjm-icon circle30">
                            <a href="https://www.xing.com/profile/Martin_Gross14/cv" target="_blank">
                                <Xing />
                            </a>
                        </button>
                        <button className="efjm-icon circle30">
                            <div className="fs15">
                                <a href="https://github.com/grossesbewirken" target="_blank">
                                    <GitHub />
                                </a>
                            </div>
                        </button>
                        <button className="efjm-icon circle30">
                            <div className="fs15">
                                <a href="https://grossesbewirken.de/news.html" target="_blank"></a>
                                <Website />
                            </div>
                        </button>
                            </div>
                        </div>
                    <div>
                </div>
            </div>
        </>
    )
}

export default Martin;