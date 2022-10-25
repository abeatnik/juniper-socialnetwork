import React, { Component } from "react";
import ProfilePic from "../ProfilePic";
import BioEditor from "../BioEditor";

interface ProfileProps {
    userData: {
        url: string;
        firstname: string;
        lastname: string;
    };
    togglePopup: React.MouseEventHandler<HTMLButtonElement>;
}

interface ProfileState {
    currentBio: string;
}

export default class Profile extends Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            currentBio: "",
        };
    }

    saveBio = (e: React.MouseEvent<HTMLButtonElement>) => {};

    render() {
        return (
            <>
                <ProfilePic
                    userData={this.props.userData}
                    togglePopup={this.props.togglePopup}
                />
                <h2>
                    {this.props.userData.firstname +
                        " " +
                        this.props.userData.lastname}
                </h2>
                <BioEditor
                    currentBio={this.state.currentBio}
                    saveBio={this.saveBio}
                />
            </>
        );
    }
}
