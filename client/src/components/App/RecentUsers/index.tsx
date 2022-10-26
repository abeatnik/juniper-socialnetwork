import UserComponent from "../UserComponent";
import { User } from "../../component-interfaces";
import { useState, useEffect } from "react";

const RecentUsers = () => {
    const [recentUsers, setRecentUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch("/recently-added")
            .then((response) => response.json())
            .then((recentlyAdded) => {
                setRecentUsers(recentlyAdded);
            });
    }, []); // leeres array als 2. element = nur einmal ausgefuert

    const recentUsersList = recentUsers.map((user) => (
        <li key={user.id}>
            <UserComponent user={user} />
        </li>
    ));

    return (
        <>
            <h3>Check out who just joined!</h3>
            <ul>{recentUsersList}</ul>
        </>
    );
};

export default RecentUsers;
