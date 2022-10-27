import { useState } from "react";
import FindFriendsResults from "../FindFriendsResults";
import RecentUsers from "../RecentUsers";

const FindFriends = () => {
    const [findFriend, setFindFriend] = useState<string>("");

    const updateSearchInput = (value: HTMLInputElement["value"]) => {
        setFindFriend(value);
    };

    return (
        <>
            <h1>Searching for Friend: {findFriend}</h1>
            <input
                type="text"
                value={findFriend}
                onChange={(e) => updateSearchInput(e.target.value)}
            ></input>
            {findFriend && <FindFriendsResults searchString={findFriend} />}
            {!findFriend && <RecentUsers />}
        </>
    );
};

export default FindFriends;
