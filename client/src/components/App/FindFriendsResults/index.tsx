import { User } from "../../component-interfaces";
import { useState, useEffect } from "react";
import UserComponent from "../UserComponent";

const FindFriendsResults = ({ searchString }: { searchString: string }) => {
    const [findFriendsResults, setFindFriendsResult] = useState<User[]>([]);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(
        null
    );

    useEffect(() => {
        filterTwice();
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

    const filterTwice = () => {
        const searchArr: string[] = searchString.trim().split(" ");
        const filtered: User[] = findFriendsResults.filter((person) => {
            if (searchArr.length === 1) {
                return (
                    person.first.startsWith(searchArr[0]) ||
                    person.last.startsWith(searchArr[0])
                );
            } else {
                return (
                    person.first.startsWith(searchArr[0]) &&
                    person.last.startsWith(searchArr[1])
                );
            }
        });
        setFindFriendsResult(filtered);
    };

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
