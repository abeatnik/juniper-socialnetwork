import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { User } from "../../component-interfaces";
import FriendButton from "../FriendButton";

const OtherProfile = () => {
    const history = useHistory();
    const paramId = useParams<{ id: string }>().id;
    const [profileData, setProfileData] = useState<User>({
        first: "",
        last: "",
        url: "",
        bio: "",
        id: "",
        online: false,
    });

    useEffect(() => {
        fetch(`/user-profile/${paramId}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setProfileData({ ...data.userData });
                } else {
                    if (data.ownProfile) {
                        history.push("/");
                    } else {
                        history.replace("/");
                    }
                }
            });

    }, [paramId]);

    return (
        <>
            <div className="profile-other">
                <div className="profile-view">
                    <div className="profile-picture">
                        <button>
                            <img
                                src={profileData.url || "/assets/astronaut.svg"}
                                alt={profileData.first + " " + profileData.last}
                            />
                        </button>
                    </div>
                    <div className="profile-information">
                        <div className="bio-info">
                            <h2>
                                {profileData.first + " " + profileData.last}
                            </h2>
                            <p>{profileData.bio}</p>
                            <FriendButton ownerId={paramId} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OtherProfile;
