import Logo from "../Logo";
import ProfilePic from "../ProfilePic";
import Logout from "../Logout";
import { User } from "../../component-interfaces";
import UserList from "../UserList";
import FriendList from "../FriendList";
import "./style.css";

const Navigation = (props: {
    userData: User;
    togglePopup: React.MouseEventHandler<HTMLButtonElement>;
}) => {
    return (
        <>  
            <div className="logo-small">
                <Logo />
            </div>
            <div className="right">
                <div className="nav-button"><UserList /></div>
                <div className="nav-button"><Logout /></div>
                <div id="profile-small">
                    <ProfilePic
                    userData={props.userData}
                    togglePopup={props.togglePopup}/>
                </div>
            </div>
        </>
    );
};

export default Navigation;
