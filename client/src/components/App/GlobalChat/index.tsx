import { ChangeEvent, useEffect, useState, useRef} from "react";
import { useSelector } from "react-redux";
import {socket} from "../../../socket";
import {RootState} from "../../../redux/store";
import MessageComponent from "../MessageComponent";
import {Message} from "../../../redux/messages/slice"
import "./style.css";


const GlobalChat = () => {
    const messages = useSelector((state: RootState) => state.messages)
    const [textValue, setTextValue] = useState<string>("");
    const elemRef = useRef<HTMLLIElement| null>(null);

    useEffect(()=> {
        if(elemRef){
            elemRef.current?.scrollIntoView();
        }
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter'){
            e.preventDefault();
            const message= e.currentTarget.value.trim();
            socket.emit("globalMessage", {message})
            setTextValue("");
        }
        
    }
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(e.target.value);
    }
    const reverse = [...messages].reverse();
    const messagesDisplay = reverse.map((message: Message ) => {
        return (
            <li key={message.id} ref={elemRef}>
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
                <textarea name="post-message" id="post-message" placeholder="Say hello to everyone..." value={textValue} onChange={handleChange} onKeyDown={handleKeyDown}></textarea>
            </div>

        </>
    )

};

export default GlobalChat;