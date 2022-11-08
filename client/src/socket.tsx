import {io, Socket} from "socket.io-client";
import {Store} from "redux";
import {Message, receiveGlobalMessage, receiveGlobalMessages} from "./redux/messages/slice";
import { addOnlineUser, receiveOnlineUsers, removeOnlineUser } from "./redux/online/slice";
import { User } from "./components/component-interfaces";

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

    socket.on('onlineUsers', (data: User[]) => {
        store.dispatch(receiveOnlineUsers(data));
    })

    socket.on('userOnline', (onlineUser: User)=> {
        store.dispatch(addOnlineUser(onlineUser));
    })

    socket.on('userOffline', (userId: string)=> {
        store.dispatch(removeOnlineUser(userId));
    })
}
    return socket;
}