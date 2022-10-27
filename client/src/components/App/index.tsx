import { useEffect, useState } from "react";
import Logo from "./Logo";
import ProfilePic from "./ProfilePic";
import Uploader from "./Uploader";
import Profile from "./Profile";
import { BrowserRouter, Route } from "react-router-dom";
import RecentUsers from "./RecentUsers";
import FindFriends from "./FindFriends";
import { User } from "../component-interfaces";

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
    }, [userData]);

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
                        {/* <RecentUsers /> */}
                    </Route>
                </BrowserRouter>
            </div>
            <div className="footer"></div>
        </>
    );
};

export default App;
