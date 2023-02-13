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
    return (
        <div className={msg.from === user._id ? "mb1 right" : "mb1 left"}>
            <p className="c-FAV">{msg.text}</p>
            <p>{msg.createdAt}</p>
        </div>
    );
};


const Sender = ({sender}) => {
    const navigate = useNavigate()
    return (
        <div className="mb2" onClick={()=> navigate(`/userdetails/${sender._id}`)}>
            <div className="flex central">
                <div className="circle50 bg-FAV central"></div>
                <div className="ml1 col">
                    <p>{sender.profile?.firstName}</p>
                    <p className="c-A80">{sender.profile?.isRecruiter ? "recruiter" : "talent"}</p>
                </div>
            </div>
        </div>
    );
};

export { ReceiveMessage, Message, Sender };