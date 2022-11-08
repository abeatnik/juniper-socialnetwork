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

export const addOnlineUser = (onlineUser: User) => {
    return {
        type : "online-users/add",
        payload : {onlineUser},
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
        const filteredUsers = state.filter((user: User) => user.id !== action.payload.onlineUser.id);
        return [action.payload.onlineUser, ...filteredUsers]
    }
    return state;
}

export default onlineUsersReducer;





