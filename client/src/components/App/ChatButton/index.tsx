import React from "react";

const ChatButton = () => {
    const enterChat = (e: React.MouseEvent<HTMLButtonElement>) => {
        window.location.replace("/chat/global");
    };

    return (
        <>
            <div className="button-container">
                <button className="enter-chat" onClick={enterChat}>
                    <div className="chat-icon">Chat</div>
                </button>
            </div>
        </>
    );
};

export default ChatButton;
