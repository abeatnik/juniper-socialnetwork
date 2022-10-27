import ProfilePic from "../ProfilePic";
import BioEditor from "../BioEditor";
import { User } from "../../component-interfaces";

const Profile = (props: {
    userData: User;
    togglePopup: React.MouseEventHandler<HTMLButtonElement>;
    updateBio: Function;
}) => {
    return (
        <>
            <ProfilePic
                userData={props.userData}
                togglePopup={props.togglePopup}
            />
            <h2>{props.userData.first + " " + props.userData.last}</h2>
            <BioEditor
                currentBio={props.userData.bio}
                updateBio={props.updateBio}
            />
        </>
    );
};

export default Profile;
