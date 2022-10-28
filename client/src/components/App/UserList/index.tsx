import React from "react";
import { useHistory } from "react-router";

const UserList = () => {
    const history = useHistory();
    const showUsers = (e: React.MouseEvent<HTMLButtonElement>) => {
        window.location.replace("/users");
        // history.push("/users");
    };

    return (
        <>
            <div className="button-container">
                <button className="show-users" onClick={showUsers}>
                    <div className="search-icon">Find People</div>
                </button>
            </div>
        </>
    );
};

export default UserList;
