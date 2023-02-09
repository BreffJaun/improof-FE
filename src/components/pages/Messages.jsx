import Footer from "../elements/Footer.jsx";
import {ReceiveMessage, SendMessage, Sender} from "../elements/MessageCard.jsx"



const Messages = () => {
  return (
    <>
      <div className="center">
        <h1 className="c-FAV mt1 mb2">messages</h1>

        <div className="wide col">

        <Sender />
        <ReceiveMessage />
        <SendMessage />
        </div>
        </div>
      <Footer />
    </>
  );
};

export default Messages;