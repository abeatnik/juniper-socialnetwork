import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { receiveFriendships } from "../../../redux/friendships.slice";
import { useSelector } from "react-redux";
import {Friendship, StateInterface} from "../../../redux/friendships.slice";
import FriendComponent from "../FriendComponent";
import "./style.css";

const Friendships = () => {
    const dispatch = useDispatch();
    const friendships = useSelector((state:  StateInterface)=> {
        return state.friendships});

    useEffect(()=> {
        fetch("/friendships")
        .then(response => response.json())
        .then(data => {
            data.success && dispatch(receiveFriendships(data.friendships))
        });
    }, [])

    const friends: Friendship[] = friendships && friendships.length>=1 ? friendships.filter(friend => friend.accepted === true): [];
    const receivedRequests: Friendship[] =  (friendships && friendships.length>=1) ? friendships.filter(friend => friend.accepted === false) : [];

    const showFriends = friends.map(friend => {
        return (
            <li key={friend.id}>
                <FriendComponent friend={friend}/>
            </li>
        )
    })

    const showReceivedRequests= receivedRequests.map(friend => {
        return (
            <li key={friend.id}>
                <FriendComponent friend={friend}/>
            </li>
        )
    })

    return (
        <>
        <div className="search-container">
            <h2>{receivedRequests.length === 1? "One person wants" : receivedRequests.length + " people want"} to be friends with you:</h2>
            <ul className="friend-search-results">{showReceivedRequests}</ul>
            <h2 className="friend-list-label">Your Friends:</h2>
            <ul className="friend-search-results">{showFriends}</ul> 
        </div>
        </>

    )



}

export default Friendships;