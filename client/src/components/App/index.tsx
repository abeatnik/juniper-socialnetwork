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
import Navigation from "./Navigation";
import Friendships from "./Friendships";
import "./style.css";
import GlobalChat from "./GlobalChat";
import OnlineUsers from "./OnlineUsers";
import { initSocket } from "../../socket";
import store from "../../redux/store";

const App = () => {
    const [userData, setUserData] = useState<User>({
        first: "",
        last: "",
        url: "",
        bio: "",
        id: "",
        online: false,
    });

    const [showUploader, setShowUploader] = useState<boolean>(false);

    useEffect(() => {
        updateProfile();
        initSocket(store);
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
        togglePopup();
        location.reload();
    };

    return (
        <>
            <div className="header">
                <Navigation
                    userData={userData}
                    togglePopup={() => togglePopup()}
                />
            </div>
            <div className="app-main">
                {showUploader && (
                    <Uploader
                        setProfilePic={setProfilePic}
                        togglePopup={togglePopup}
                    />
                )}
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
                    <Route path="/people/:search?">
                        <FindFriends />
                    </Route>
                    <Route path="/users/:id" children={<OtherProfile />} />
                    <Route exact path="/friends">
                        <Friendships />
                    </Route>
                    <Route path="/chat/global">
                        <div className="chat-container">
                            <GlobalChat />
                        </div>
                        <div className="online-container">
                            <OnlineUsers />
                        </div>
                    </Route>
                </BrowserRouter>
            </div>
            <div className="footer"></div>
        </>
    );
};

export default App;
