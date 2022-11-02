import { Friendship } from "../../../redux/friendships";
import FriendButton from "../FriendButton";
import { useHistory } from "react-router";

interface FriendComponentProps {
    friend: Friendship;
}

const FriendComponent = ({ friend }: FriendComponentProps) => {
    const history = useHistory();

    const showProfile = () => {
        history.push(`/users/${friend.id}`);
    };

    return (
        <>
            <div className="avatar" onClick={showProfile}>
                <img src={friend.url} alt={friend.first + " " + friend.last} />
            </div>
            <p>
                {friend.first} {friend.last}
            </p>
            {friend.accepted? <div className="unfriend"><FriendButton ownerId={friend.id}/></div> : <FriendButton ownerId={friend.id}/> }
        </>
    );
};

export default FriendComponent;
