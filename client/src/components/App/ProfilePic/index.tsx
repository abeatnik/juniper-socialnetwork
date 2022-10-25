import React from "react";
import "./style.css";

interface ProfilePicProps {
    userData: {
        url: string;
        firstname: string;
        lastname: string;
    };
    togglePopup: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ProfilePic(props: ProfilePicProps) {
    return (
        <div className="profilePic">
            <button onClick={props.togglePopup}>
                <img
                    src={props.userData.url}
                    alt={
                        props.userData.firstname + " " + props.userData.lastname
                    }
                />
            </button>
        </div>
    );
}
