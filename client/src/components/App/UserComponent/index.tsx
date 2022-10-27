import { User } from "../../component-interfaces";

interface UserComponentProps {
    user: User;
}

const UserComponent = ({ user }: UserComponentProps) => {
    return (
        <>
            <div className="avatar">
                <img src={user.url} alt={user.first + " " + user.last} />
            </div>
            <p>
                {user.first} {user.last}
            </p>
        </>
    );
};

export default UserComponent;
