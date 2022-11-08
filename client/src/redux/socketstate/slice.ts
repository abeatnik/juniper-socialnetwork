import {Reducer} from "redux";
import { Socket } from "socket.io-client";

const initialState: Socket | null = null;

const socketReducer: Reducer = (socket = initialState, action) => {
    return action.type === '/socket/receive'? action.payload.socket : socket;
}

export const receiveSocket = (socket: Socket) => {
    return {
        type: "/socket/receive",
        payload: {socket},
    }
}

export default socketReducer;