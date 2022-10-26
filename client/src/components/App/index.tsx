import { Component } from "react";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";
import { BrowserRouter, Route } from "react-router-dom";
import RecentUsers from "./RecentUsers";
import FindFriends from "./FindFriends";

interface AppProps {
    userId: number;
}

interface AppState {
    showUploader: boolean;
    userData: {
        url: string;
        first: string;
        last: string;
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
                first: "",
                last: "",
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
                    <BrowserRouter>
                        <Route exact path="/">
                            <div className="profile">
                                <Profile
                                    userData={this.state.userData}
                                    togglePopup={this.togglePopup}
                                    updateBio={this.updateBio}
                                />
                            </div>
                        </Route>
                        <Route exact path="/users">
                            <FindFriends />
                            {/* <RecentUsers /> */}
                        </Route>
                    </BrowserRouter>
                </div>
                <div className="footer"></div>
            </>
        );
    }
}
