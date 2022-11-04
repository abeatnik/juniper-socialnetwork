import {Reducer} from "redux";

export interface Friendship {
    id: string;
    first: string;
    last: string;
    url: string;
    accepted : boolean;
}

const initialState: Friendship[] = [];

export const receiveFriendships = (friendships: Friendship[]) => {
    return {
        type : "friendships/receive",
        payload : {friendships},
    }
}

export const removeFriendship = (id: string) => {
    return {
        type : "friendships/remove",
        payload : {id},
    }

}

export const addFriendship = (id:string) => {
    return {
        type : "friendships/add",
        payload : {id},
    }
}

const friendshipReducer: Reducer = (state = initialState, action) => {
    if (action.type === "friendships/receive"){
        return action.payload.friendships;
    }
    if (action.type === "friendships/remove"){
        return state.filter((friend: Friendship )=> friend.id !== action.payload.id);
        }
    if (action.type === "friendships/add"){
        return state.map((friend: Friendship) => {
            if (friend.id === action.payload.id) {
                const newFriend = {...friend};
                newFriend.accepted = true;
                return newFriend;
            } 
            return friend;
        });
    }
    return state;
}

export default friendshipReducer;





