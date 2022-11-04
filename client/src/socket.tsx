import {io, Socket} from "socket.io-client";
import {Store} from "redux";
import {Message, receiveGlobalMessage, receiveGlobalMessages} from "./redux/messages/slice";
import { useDispatch } from "react-redux";

export let socket: Socket;
//<ServerToClientEvents, ClientToServerEvents>

export const initSocket = (store: Store) => {
    if(!socket){
        socket = io();

    socket.on('globalMessages', (data: Message[]) => {
        store.dispatch(receiveGlobalMessages(data));
    })

    socket.on('globalMessage', (data: Message) => {
        store.dispatch(receiveGlobalMessage(data));
    })
    }
}