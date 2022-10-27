import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { User } from "../../component-interfaces";

const OtherProfile = () => {
    const history = useHistory();
    const paramId = useParams<{ id: string }>().id;
    const [profileData, setProfileData] = useState<User>({
        first: "",
        last: "",
        url: "",
        bio: "",
        id: "",
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
            <div className="other-profile">
                <div className="user-pic">
                    <img
                        src={profileData.url}
                        alt={profileData.first + " " + profileData.last}
                    />
                </div>
                <h3>{profileData.first + " " + profileData.last}</h3>
                <p>{profileData.bio}</p>
            </div>
        </>
    );
};

export default OtherProfile;
