import { useState } from "react";
import FindFriendsResults from "../FindFriendsResults";

const FindFriends = () => {
    const [findFriend, setFindFriend] = useState<string>("");
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
        null
    );

    const updateSearchInput = (value: HTMLInputElement["value"]) => {
        clearTimeout(searchTimeout);
        const timeout = setTimeout(() => {
            setFindFriend(value);
            console.log("value changed");
        }, 300);
        setSearchTimeout(timeout);
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
        </>
    );
};

export default FindFriends;
