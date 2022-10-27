import { useState } from "react";
import FindFriendsResults from "../FindFriendsResults";
import RecentUsers from "../RecentUsers";
import "./style.css";

const FindFriends = () => {
    const [findFriend, setFindFriend] = useState<string>("");

    const updateSearchInput = (value: HTMLInputElement["value"]) => {
        setFindFriend(value);
    };

    return (
        <>
            <div className="friend-search-field">
                <label htmlFor="friendsearch">Find people you know: </label>
                <input
                    type="text"
                    name="friendsearch"
                    value={findFriend}
                    onChange={(e) => updateSearchInput(e.target.value)}
                ></input>
            </div>
            {findFriend && <FindFriendsResults searchString={findFriend} />}
            {!findFriend && <RecentUsers />}
        </>
    );
};

export default FindFriends;
