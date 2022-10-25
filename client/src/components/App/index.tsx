import { Component } from "react";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";

interface AppProps {
    userId: number;
}

interface AppState {
    showUploader: boolean;
    userData: {
        url: string;
        firstname: string;
        lastname: string;
        bio: string;
    };
}
export default class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            showUploader: false,
            userData: {
                url: "",
                firstname: "",
                lastname: "",
                bio: "",
            },
        };
    }

    componentDidMount(): void {
        this.updateProfile();
    }

    updateProfile = () => {
        fetch(`/user-info`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    userData: Object.assign(this.state.userData, data.userData),
                });
            });
    };

    updateBio = (newBio: string) => {
        this.setState({
            userData: Object.assign(this.state.userData, { bio: newBio }),
        });
    };

    togglePopup = () => {
        console.log("button clicked");
        this.setState({
            showUploader: !this.state.showUploader,
        });
    };

    setProfilePic = (newUrl: string) => {
        this.setState({
            userData: Object.assign(this.state.userData, {
                url: newUrl,
            }),
        });
    };

    render() {
        console.log("App-userData ", this.state.userData);
        return (
            <>
                <div className="header">
                    <div className="logo-small">
                        <Logo />
                    </div>
                    <div id="profile-small">
                        <ProfilePic
                            userData={this.state.userData}
                            togglePopup={this.togglePopup}
                        />
                    </div>
                </div>
                <div className="app-main">
                    {this.state.showUploader && (
                        <Uploader setProfilePic={this.setProfilePic} />
                    )}
                    <div className="profile">
                        <Profile
                            userData={this.state.userData}
                            togglePopup={this.togglePopup}
                            updateBio={this.updateBio}
                        />
                    </div>
                </div>
                <div className="footer"></div>
            </>
        );
    }
}
