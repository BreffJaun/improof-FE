import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { host } from "../api/host.jsx"


import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Registration = () => {

    const navigate = useNavigate();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        theme: "dark",
    };

    const [registrationData, setRegistrationData] = useState({profile:{}})

    const handleInput = (event) => {
        setRegistrationData({...registrationData, [profile.event.target.name]: event.target.value});
    }

    const handleTalent = (event) => {
        console.log(event.target)
        setRegistrationData({...registrationData, [profile.isTalent]: true, [profile.isRecruiter]: false});
    }
    const handleRecruiter = (event) => {
        console.log(event.target)
        setRegistrationData({...registrationData, [profile.isRecruiter]: true,  [profile.isTalent]: false});
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
                }
            });
        };
        sendRegistrationData();
    }


    return (
        <form onClick={handleSubmit}>
            <div>
                <label>create your account</label>
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
            <button type="submit" >register</button>
            <ToastContainer />
        </form>
    )
}

export default Registration