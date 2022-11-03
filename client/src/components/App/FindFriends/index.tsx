import { useState, useEffect } from "react";
import FindFriendsResults from "../FindFriendsResults";
import RecentUsers from "../RecentUsers";
import "./style.css";
import { useHistory, useParams } from "react-router";

const FindFriends = () => {
    const history = useHistory();
    const [findFriend, setFindFriend] = useState<string>("");
    const searchString = useParams<{search: string}>().search;

    const updateSearchInput = (value: HTMLInputElement["value"]) => {
        setFindFriend(value);
        history.replace(`/people/${value}`)
    };

    useEffect(()=>{
        setFindFriend(searchString);
    },[])

    return (
        <>
            <div className="search-container">
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
            </div>
                <RecentUsers />
        </>
    );
};

export default FindFriends;
