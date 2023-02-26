import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../../api/host.jsx"
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../elements/Footer.jsx";


// COMPONENTS
import { LogoL } from "../../components/Logo"


const Registration = () => {
    const navigate = useNavigate();    

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        theme: "dark",
    };

    const [registrationData, setRegistrationData] = useState({profile:{}})

    const handleInput = (event) => {
        setRegistrationData({...registrationData, profile:{ ...registrationData.profile,
            [event.target.name]: event.target.value
        }
        });
    }

    const handleTalent = (event) => {
        setRegistrationData({...registrationData, profile:{...registrationData.profile, isTalent: true, isRecruiter: false}});
    }
    const handleRecruiter = (event) => {
        setRegistrationData({...registrationData, profile:{...registrationData.profile, isRecruiter: true,  isTalent: false}});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const sendRegistrationData = async ()  => {
        await fetch(`${host}/users/add`, {
            method: 'POST',
            body: JSON.stringify(registrationData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                if (!json.status) {
                    toast.error(json.error, toastOptions);
                } else {
                    toast.info("We sent you an email for verification.", toastOptions);
                    setTimeout(()=> navigate("/login"), 8000)
                }
            });
        };
  
        if( registrationData.profile.password !== registrationData.profile.confirmPassword){
            toast.info("confirm password an password are not equal", toastOptions)
        }else if (!registrationData.profile.isRecruiter && !registrationData.profile.isTalent ){
            toast.info("Are you a talent or a recruiter?", toastOptions)
        }else{
            sendRegistrationData();
        }
            
    }


    return (
        <div className="maxHH central col" >
            <div className="">

                <div className="mb2 mt2">
                    <LogoL/>
                </div>
                <p className="central c-FAV mb1">create your account</p>

                <form onSubmit={handleSubmit}>
                    <div className="col">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="first name"
                            required
                            className="mb05 shadow-s"
                            onChange={handleInput}
                        />
                        <input
                            type="text" 
                            name="lastName" 
                            placeholder="last name" 
                            required 
                            className="mb05 shadow-s"    
                            onChange={handleInput} 
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="email" 
                            required 
                            className="mb05 shadow-s"
                            onChange={handleInput}
                        />
                    </div>
                    <div className="col mb2 mt3">
                        <input
                            type="password"
                            name="password"
                            placeholder="password"
                            required
                            className="mb05 shadow-s"
                            onChange={handleInput}
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="confirm password"
                            required
                            className="mb05 shadow-s"
                            onChange={handleInput}
                        />
                    </div>
                    <div className="central">
                        <div className="mb05 flex">
                            <label className="mr05">i am a talent</label>
                            <input
                                type="radio"
                                name="whoAmI"
                                value="isTalent"
                                onChange={handleTalent}
                            />
                        </div>
                        <div className="mb05 ml2 flex">
                            <input
                                type="radio"
                                name="whoAmI"
                                value="isRecruiter"
                                onChange={handleRecruiter}
                            />
                            <label className="ml05">i am a recruiter</label>
                        </div>
                    </div>
                    <div className="central mb2 mt2">
                        <button type="submit" className="bg-FAV">register</button>
                    </div>
                    <div className="central">
                        <p>already registered? 
                            <NavLink to="/login">click here</NavLink>
                        </p>
                    </div>
                    </form>
            <ToastContainer />
            </div>
        </div>
    )
}

export default Registration