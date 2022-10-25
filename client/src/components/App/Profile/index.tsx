import React, { Component } from "react";
import ProfilePic from "../ProfilePic";
import BioEditor from "../BioEditor";

interface ProfileProps {
    userData: {
        url: string;
        firstname: string;
        lastname: string;
        bio: string;
    };
    togglePopup: React.MouseEventHandler<HTMLButtonElement>;
    updateBio: Function;
}

interface ProfileState {}

export default class Profile extends Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);
    }

    render() {
        console.log("bioprop-profile", this.props.userData.bio);
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
                    currentBio={this.props.userData.bio}
                    updateBio={this.props.updateBio}
                />
            </>
        );
    }
}
