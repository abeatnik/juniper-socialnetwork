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
    return (
        <>
            <div className="avatar-message" onClick={showProfile}>
                <img src={message.url || "/assets/astronaut.svg"} alt={message.first + " " + message.last} />
            </div>
            <p><span>{message.first} {message.last}</span><span> {"at " + new Date(message.created_at).toLocaleTimeString()}</span></p>
            <p>{message.message}</p>
        </>
    );
};

export default MessageComponent;
