import { User } from "../../component-interfaces";
import "./style.css";
import { useHistory } from "react-router";

interface UserComponentProps {
    user: User;
}

const UserComponent = ({ user }: UserComponentProps) => {
    const history = useHistory();

    const showProfile = () => {
        history.push(`/users/${user.id}`);
    };

    return (
        <>
            <div className="avatar" onClick={showProfile}>
                <img src={user.url} alt={user.first + " " + user.last} />
            </div>
            <p>
                {user.first} {user.last}
            </p>
        </>
    );
};

export default UserComponent;
