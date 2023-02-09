

const ReceiveMessage = () => {
    return (
        <div className="mb1 left">
            <p className="c-FAV">this is just a testmessage</p>
            <p>09.02.2023 15:02</p>
        </div>
    );
};


const SendMessage = () => {

    return (
        <div className="mb1 right">
            <p className="c-FAV">this is just a testmessage</p>
            <p>09.02.2023 15:02</p>
        </div>
    );
};


const Sender = () => {
    return (
        <div className="mb2" >
            <div className="flex central">
                <div className="circle50 bg-FAV central"></div>
                <div className="ml1 col">
                    <p>Fred Feuerstein</p>
                    <p className="c-A80">isRecruiter/isTalent</p>
                </div>
            </div>
        </div>
    );
};

export { ReceiveMessage, SendMessage, Sender };