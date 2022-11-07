import { Message } from "../../../redux/messages/slice";
import {useHistory} from "react-router";

interface MessageComponentProps {
    message : Message;
}

const MessageComponent = ({message}: MessageComponentProps) => {
    const history = useHistory();

    const showProfile = () => {
        history.push(`/users/${message.sender_id}`);
    };

    const today = new Date().toLocaleDateString();

    return (
        <>
            <div className="avatar-message" onClick={showProfile}>
                <img src={message.url || "/assets/astronaut.svg"} alt={message.first + " " + message.last} />
            </div>
            <div className="text-box">
                <span>{message.first} {message.last}</span><span> {today === new Date(message.created_at).toLocaleDateString()? new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}):  new Date(message.created_at).toLocaleDateString() + "   " + new Date(message.created_at).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</span>
                <p>{message.message}</p>
            </div>
        </>
    );
};

export default MessageComponent;
