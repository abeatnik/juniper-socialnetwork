import {Reducer} from "redux";

export interface Message {
    id : string,
    sender_id : string,
    first : string,
    last : string,
    url : string,
    message : string,
    created_at : string,
}


const messagesReducer: Reducer = (messages: Message[] = [], action) => {
    switch(action.type) {
        case '/messages/receive-many':
            return action.payload.messages;
            break;
        case '/messages/receive-one':
            return [action.payload.message, ...messages]
            break;
        default: 
            return messages;
    }
}

export const receiveGlobalMessages = (messages: Message[]) => {
    return {
        type: "/messages/receive-many",
        payload: {messages},
    }
}

export const receiveGlobalMessage = (message: Message) => {
    return {
        type: "/messages/receive-one",
        payload: {message},
    }
}

export default messagesReducer;