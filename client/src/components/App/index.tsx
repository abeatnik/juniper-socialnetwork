import { useEffect, useState } from "react";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";
import { BrowserRouter, Route } from "react-router-dom";
import FindFriends from "./FindFriends";
import { User } from "../component-interfaces";
import Logout from "./Logout";
import OtherProfile from "./OtherProfile";
import "./style.css";

const App = () => {
    const [userData, setUserData] = useState<User>({
        first: "",
        last: "",
        url: "",
        bio: "",
        id: "",
    });

    const [showUploader, setShowUploader] = useState<boolean>(false);

    useEffect(() => {
        updateProfile();
    }, []);

    const updateProfile = () => {
        fetch(`/user-info`)
            .then((response) => response.json())
            .then((data) => {
                setUserData({ ...data.userData });
            });
    };

    const updateBio = (newBio: string) => {
        setUserData({
            ...userData,
            bio: newBio,
        });
    };

    const togglePopup = () => {
        setShowUploader(!showUploader);
    };

    const setProfilePic = (newUrl: string) => {
        setUserData({
            ...userData,
            url: newUrl,
        });
    };

    return (
        <>
            <div className="header">
                <div className="logo-small">
                    <Logo />
                </div>
                <div id="profile-small">
                    <ProfilePic userData={userData} togglePopup={togglePopup} />
                </div>
                <Logout />
            </div>
            <div className="app-main">
                {showUploader && <Uploader setProfilePic={setProfilePic} />}
                <BrowserRouter>
                    <Route exact path="/">
                        <div className="profile">
                            <Profile
                                userData={userData}
                                togglePopup={togglePopup}
                                updateBio={updateBio}
                            />
                        </div>
                    </Route>
                    <Route exact path="/users">
                        <FindFriends />
                    </Route>
                    <Route path="/users/:id" children={<OtherProfile />} />
                </BrowserRouter>
            </div>
            <div className="footer"></div>
        </>
    );
};

export default App;
