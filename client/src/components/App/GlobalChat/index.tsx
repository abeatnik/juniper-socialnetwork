import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {socket} from "../../../socket";
import {RootState} from "../../../redux/store";
import MessageComponent from "../MessageComponent";
import {Message} from "../../../redux/messages/slice"


const GlobalChat = () => {
    const messages = useSelector((state: RootState) => state.messages)
    const [textValue, setTextValue] = useState<string>("");

    useEffect(()=> {
        //use ref! to get the scroll position
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter'){
            e.preventDefault();
            const message= e.currentTarget.value.trim();
            console.log("new message from client! ", message);
            socket.emit("globalMessage", {message})
        }
        
    }
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(e.target.value);
    }

    const messagesDisplay = messages.reverse().map((message: Message ) => {
        return (
            <li key={message.id}>
                <MessageComponent message={message}/>
            </li>
        )
    })

    return (
        <>  
            <div className="messages">
                {messages && 
                    <ul>{messagesDisplay}</ul>}
            </div>
            <div className="new-message">
                <textarea name="post-message" id="post-message" cols={30} rows={10} value={textValue} onChange={handleChange} onKeyDown={handleKeyDown}></textarea>
            </div>

        </>
    )

};

export default GlobalChat;