import { combineReducers } from "redux";
import friendshipReducer from "./friendships/slice";
import messagesReducer from "./messages/slice";
import onlineUsersReducer from "./online/slice";
import { createStore, applyMiddleware } from 'redux';
import * as immutableState from "redux-immutable-state-invariant"


const rootReducer = combineReducers({
    friendships: friendshipReducer,
    messages : messagesReducer,
    onlineUsers: onlineUsersReducer,
})

const store = createStore(rootReducer, applyMiddleware(immutableState.default()));

export type RootState = ReturnType<typeof rootReducer>

export default store;