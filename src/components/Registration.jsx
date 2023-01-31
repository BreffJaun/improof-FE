import { useState } from "react";
import { NavLink } from "react-router-dom";
import { host } from "../api/host.jsx"


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Registration = () => {

    const [registrationData, setRegistrationData] = useState({})



    const handleInput = (event) => {
        setRegistrationData({...registrationData, [event.target.name]: event.target.value});
    }

    const handleTalent = (event) => {
        console.log(event.target)
        setRegistrationData({...registrationData, isTalent: true, isRecruiter: false});
    }
    const handleRecruiter = (event) => {
        console.log(event.target)
        setRegistrationData({...registrationData, isRecruiter: true,  isTalent: false});
    }


    return (
        <form>
            <div>
                <p>create your account</p>
                <input type="text" name="firstName" placeholder="first name" onChange={handleInput}/>
                <input type="text" name="lastName" placeholder="last name" onChange={handleInput}/>
                <input type="email" name="email" placeholder="email" onChange={handleInput}/>
            </div>
            <div>
                <input type="password" name="password" placeholder="password" onChange={handleInput}/>
                <input type="password" placeholder="confirm password"/>
            </div>
            <form>
                <input type="radio" name="whoAmI" value="isTalent" onChange={handleTalent}/>
                <label>i am a talent</label>
                <input type="radio" name="whoAmI" value="isRecruiter" onChange={handleRecruiter}/>
                <label>i am a recruiter</label>
            </form>
        </form>
    )
}

export default Registration