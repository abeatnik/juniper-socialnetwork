import { useDispatch } from "react-redux";
import { removeFriendship } from "../../../redux/friendships";

const RejectButton = (props: { ownerId: string, setRelation: React.MouseEventHandler<HTMLButtonElement>}) => {
    const dispatch = useDispatch();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
            fetch(`/friend-request/friend/${props.ownerId}`)
                .then((response) => response.json())
                .then((data) => {
                    data.success && dispatch(removeFriendship(props.ownerId));
        });
    }

    return (
        <>
            <div className="button-container">
                <button className="reject-button" onClick={(e) => {props.setRelation(e); handleClick(e) }}>Reject Request</button>
            </div>
        </>
    );
};

export default RejectButton;
