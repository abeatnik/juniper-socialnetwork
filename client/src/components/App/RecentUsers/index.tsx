import UserComponent from "../UserComponent";
import { User } from "../../component-interfaces";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

const RecentUsers = () => {
    const [recentUsers, setRecentUsers] = useState<User[]>([]);
    const history = useHistory();
    useEffect(() => {
        fetch("/recently-added")
            .then((response) => response.json())
            .then((recentlyAdded) => {
                setRecentUsers(recentlyAdded);
            });
    }, []); // leeres array als 2. element = nur einmal ausgefuert

    const showOtherProfile =
        (paramId: string) => (e: React.MouseEvent<HTMLLIElement>) => {
            history.push(`/users/${paramId}`);
        }; /// cannot access e.target.key, but if I curry the function, I can have the event handler as the returned function

    const recentUsersList = recentUsers.map((user) => (
        <li key={user.id} onClick={showOtherProfile(user.id)}>
            <UserComponent user={user} />
        </li>
    ));

    return (
        <>
            <div className="recent">
                <h4 className="result-heading">Check out who just joined!</h4>
                <ul className="recent-user-list">{recentUsersList}</ul>
            </div>
        </>
    );
};

export default RecentUsers;
