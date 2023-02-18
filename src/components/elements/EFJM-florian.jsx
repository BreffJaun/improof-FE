import { FaLinkedinIn as LinkedIn } from "react-icons/fa"
import { FaXing as Xing } from "react-icons/fa"
import { AiFillGithub as GitHub } from "react-icons/ai"
import { TbWorld as Website} from "react-icons/tb"


const Florian = () => {
    return (
        <>
            <div className="card efjm-card rel col">
                <div className="central mb2">
                    <div className="efjm-avatar-container bg-FAV central">
                        <h1>FM</h1>
                    </div>
                    <div className="mt5 col">
                        <h3 className="c-FAV center mb05">Florian Mewes</h3>
                        <p className="c-A60">"insert your slogan here!"</p>
                    </div>
                </div>
                <div>
                    <div className="col mb1">
                        <p className="c-FAV">Mein Bereich:</p>
                        <p>rocks React, loves Frontend and rules JavaScript</p>
                    </div>
                    <div className="col mb1">
                        <p className="c-FAV">Meine Stärken</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores magni, quibusdam omnis alias illum quos!</p>
                    </div>
                </div>
                <div>
                    <div className="contact mt15 mb15">
                        <button className="efjm-icon circle30">
                            <div className="fs15">
                                <a href="https://github.com/itzFlorian" target="_blank">
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

export default Florian;