import { combineReducers } from "redux";
import friendshipReducer from "./friendships.slice";
import { createStore, applyMiddleware } from 'redux';
import * as immutableState from "redux-immutable-state-invariant"


const rootReducer = combineReducers({
    friendships: friendshipReducer,
})

const store = createStore(rootReducer, applyMiddleware(immutableState.default()));


export default store;