import React from "react";

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
        <>
            <button onClick={props.togglePopup}>
                <img
                    src={props.userData.url}
                    alt={
                        props.userData.firstname + " " + props.userData.lastname
                    }
                />
            </button>
        </>
    );
}
