import React from "react";
import "./style.css";

interface ProfilePicProps {
    userData: {
        url: string;
        first: string;
        last: string;
    };
    togglePopup: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfilePic = (props: ProfilePicProps) => {
    return (
        <div className="profile-pic">
            <button onClick={props.togglePopup}>
                <img
                    src={props.userData.url}
                    alt={props.userData.first + " " + props.userData.last}
                />
            </button>
        </div>
    );
};

export default ProfilePic;
