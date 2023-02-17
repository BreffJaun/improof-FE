import { FaLinkedinIn as LinkedIn } from "react-icons/fa"
import { FaXing as Xing } from "react-icons/fa"
import { AiFillGithub as GitHub } from "react-icons/ai"
import { TbWorld as Website} from "react-icons/tb"


const Jeff = () => {
    return (
        <>
            <div className="card efjm-card rel col">
                <div className="central mb2">
                    <div className="efjm-avatar-container bg-gGR1 central">
                        <h1>JB</h1>
                    </div>
                    <div className="mt5 col">
                        <h3 className="c-GR1 center mb05">Jeff Braun</h3>
                        <p className="c-A60">"insert your slogan here!"</p>
                    </div>
                </div>
                <div>
                    <div className="col mb1">
                        <p className="c-GR1">Mein Bereich:</p>
                        <p>rules React, loves Backend and also does Frontend</p>
                    </div>
                    <div className="col mb1">
                        <p className="c-GR1">Meine Stärken</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magni, quibusdam omnis alias illum quos!</p>
                    </div>
                </div>
                <div>
                    <div className="contact mt15 mb15">
                        <button className="efjm-icon circle30">
                            <a href="https://www.linkedin.com/in/jeff-braun-0959091a4/" target="_blank">
                                <LinkedIn />
                            </a>
                        </button>
                        <button className="efjm-icon circle30">
                            <a href="https://www.xing.com/profile/Jeff_Braun2/cv" target="_blank">
                                <Xing />
                            </a>
                        </button>
                        <button className="efjm-icon circle30">
                            <div className="fs15">
                                <a href="https://github.com/BreffJaun" target="_blank">
                                    <GitHub />
                                </a>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Jeff;