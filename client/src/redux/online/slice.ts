import {Reducer} from "redux";
import {User} from "../../components/component-interfaces";


const initialState: User[] = [];

export const receiveOnlineUsers = (onlineUsers: User[]) => {
    return {
        type : "online-users/receive",
        payload : {onlineUsers},
    }
}

export const removeOnlineUser = (id: string) => {
    return {
        type : "online-users/remove",
        payload : {id},
    }

}

export const addOnlineUser = (id:string) => {
    return {
        type : "online-users/add",
        payload : {id},
    }
}

const onlineUsersReducer: Reducer = (state = initialState, action) => {
    if (action.type === "online-users/receive"){
        return action.payload.onlineUsers;
    }
    if (action.type === "online-users/remove"){
        return state.filter((onlineUser: User )=> onlineUser.id !== action.payload.id);
        }
    if (action.type === "online-users/add"){
        return state.filter((onlineUser: User) => onlineUser.id !== action.payload.id);
    }
    return state;
}

export default onlineUsersReducer;





