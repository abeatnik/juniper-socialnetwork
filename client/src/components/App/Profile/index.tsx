import ProfilePic from "../ProfilePic";
import BioEditor from "../BioEditor";
import { User } from "../../component-interfaces";
import "./style.css";

const Profile = (props: {
    userData: User;
    togglePopup: React.MouseEventHandler<HTMLButtonElement>;
    updateBio: Function;
}) => {
    return (
        <>
            <div className="profile-view">
                <div className="profile-picture">
                    <ProfilePic
                        userData={props.userData}
                        togglePopup={props.togglePopup}
                    />
                </div>
                <div className="profile-information">
                    <h2>{props.userData.first + " " + props.userData.last}</h2>
                    <div className="bio-info">
                        <BioEditor
                            currentBio={props.userData.bio}
                            updateBio={props.updateBio}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
