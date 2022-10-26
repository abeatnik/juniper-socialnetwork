import { User } from "../../component-interfaces";
import { useState, useEffect } from "react";
import UserComponent from "../UserComponent";

const FindFriendsResults = ({ searchString }: { searchString: string }) => {
    const [findFriendsResults, setFindFriendsResult] = useState<User[]>([]);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
        null
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            fetch(`/find/${searchString.split(" ").join("-")}`)
                .then((response) => response.json())
                .then(({ findFriendsResults, success }) => {
                    success && setFindFriendsResult(findFriendsResults);
                });
        }, 300);
        setSearchTimeout(timeout);
        return () => {
            clearTimeout(searchTimeout);
        };
    }, [searchString]);

    const showFindFriendResults = findFriendsResults.map((user) => (
        <li key={user.id}>
            <UserComponent user={user} />
        </li>
    ));

    return (
        <>
            <ul>{showFindFriendResults}</ul>
        </>
    );
};

export default FindFriendsResults;
