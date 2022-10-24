import { Component } from "react";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";

interface AppProps {
    userId: number;
}

interface AppState {
    showUploader: boolean;
    userData: {
        url: string;
        firstname: string;
        lastname: string;
    };
}

export default class App extends Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            showUploader: false,
            userData: {
                url: "/assets/astronaut-exploration-planet-svgrepo-com.svg",
                firstname: "",
                lastname: "",
            },
        };
    }

    componentDidMount(): void {
        fetch(`/user/id.json`)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    userData: Object.assign(this.state.userData, data.userData),
                });
            });
    }

    togglePopup = () => {
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
        return (
            <>
                <div className="header">
                    <Logo />
                    <ProfilePic
                        userData={this.state.userData}
                        togglePopup={this.togglePopup}
                    />
                </div>
                <div className="app-main">
                    {this.state.showUploader && (
                        <Uploader setProfilePic={this.setProfilePic} />
                    )}
                </div>
                <div className="footer"></div>
            </>
        );
    }
}
