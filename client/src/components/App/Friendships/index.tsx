import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { receiveFriendships } from "../../../redux/friendships/slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Friendship } from "../../../redux/friendships/slice";
import FriendComponent from "../FriendComponent";
import "./style.css";

const Friendships = () => {
    const dispatch = useDispatch();
    const friendships = useSelector((state: RootState) => {
        return state.friendships;
    });

    useEffect(() => {
        fetch("/friendships")
            .then((response) => response.json())
            .then((data) => {
                data.success && dispatch(receiveFriendships(data.friendships));
            });
    }, []);

    const friends: Friendship[] =
        friendships && friendships.length >= 1
            ? friendships.filter(
                  (friend: Friendship) => friend.accepted === true
              )
            : [];
    const receivedRequests: Friendship[] =
        friendships && friendships.length >= 1
            ? friendships.filter(
                  (friend: Friendship) => friend.accepted === false
              )
            : [];

    const showFriends = friends.map((friend) => {
        return (
            <li className="friend-li" key={friend.id}>
                <FriendComponent friend={friend} />
            </li>
        );
    });

    const showReceivedRequests = receivedRequests.map((friend) => {
        return (
            <li className="friend-li" key={friend.id}>
                <FriendComponent friend={friend} />
            </li>
        );
    });

    return (
        <>
            <div className="friendlist friends">
                <h2 className="friend-list-label">Your Friends:</h2>
                <ul className="friend-search-results">{showFriends}</ul>
            </div>
            {receivedRequests.length > 0 && (
                <div className="requests friendlist">
                    <h2>
                        {receivedRequests.length === 1
                            ? "One person wants"
                            : receivedRequests.length + " people want"}{" "}
                        to be friends with you:
                    </h2>
                    <ul className="friend-search-results">
                        {showReceivedRequests}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Friendships;
