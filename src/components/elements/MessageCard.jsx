import { useNavigate } from "react-router-dom";

const ReceiveMessage = () => {
    return (
        <div className="mb1 left">
            <p className="c-FAV">this is just a testmessage</p>
            <p>09.02.2023 15:02</p>
        </div>
    );
};


const Message = ({msg, user}) => {
    const date1 = msg.createdAt.toString().split("T")
    const date = date1[0].split("-").reverse().join(".")
    const time = date1[1].slice(0,5) 
    const color = user.meta.colorTheme[0]

     

    return (
        <div className={msg.from === user._id ? "mb1 right" : "mb1 left"}>
            <p className={color}>{msg.text}</p>
            <p>{date} {time}</p>
        </div>
    );
};


const Sender = ({sender}) => {
    const navigate = useNavigate()
    // const bg = sender.meta.colorTheme[1]
    return (
        <div className="mb2" onClick={()=> navigate(`/userdetails/${sender._id}`)}>
            <div className="flex central">
                <div className={`circle50 bg-FAV central`}></div>
                <div className="ml1 col">
                    <p>{sender.profile?.firstName}</p>
                    <p className="c-A80">{sender.profile?.isRecruiter ? "recruiter" : "talent"}</p>
                </div>
            </div>
        </div>
    );
};

export { ReceiveMessage, Message, Sender };