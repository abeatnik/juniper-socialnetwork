import React from "react";
import { useHistory } from "react-router";

const FriendList = () => {
    const history = useHistory();
    const showFriends = (e: React.MouseEvent<HTMLButtonElement>) => {
        window.location.replace("/friends");
        // history.push("/users");
    };

    return (
        <>
            <div className="button-container">
                <button className="show-friends" onClick={showFriends}>
                    <div className="search-icon">Show Friends</div>
                </button>
            </div>
        </>
    );
};

export default FriendList;
