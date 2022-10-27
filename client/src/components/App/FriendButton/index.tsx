import React, { useState, useEffect } from "react";

const FriendButton = (props: { ownerId: string }) => {
    const [relation, setRelation] = useState<
        "none" | "sent" | "received" | "friend" | null
    >(null);

    const [action, setAction] = useState<
        "sendReq" | "cancelReq" | "acceptReq" | "cancelFriend" | null
    >(null);

    useEffect(() => {
        fetch(`/relation/${props.ownerId}`)
            .then((response) => response.json())
            .then((data) => {
                data.success ? setRelation(data.relation) : setRelation(null);
            })
            .catch(() => {
                setRelation(null);
            });
    }, [relation]);

    const sendRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAction("sendReq");
        postAction();
    };

    const cancelRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAction("cancelReq");
        postAction();
    };

    const acceptRequest = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAction("acceptReq");
        postAction();
    };

    const cancelFriendship = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAction("cancelFriend");
        postAction();
    };

    const postAction = () => {};

    switch (relation) {
        case null:
            return (
                <>
                    <button className="friend-button">
                        Send Friend Request
                    </button>
                </>
            );

        case "none":
            return (
                <>
                    <button className="friend-button" onClick={sendRequest}>
                        Send Friend Request
                    </button>
                </>
            );
        case "sent":
            return (
                <>
                    <button className="friend-button" onClick={cancelRequest}>
                        Cancel Friend Request
                    </button>
                </>
            );
        case "received":
            return (
                <>
                    <button className="friend-button" onClick={acceptRequest}>
                        Accept Friend Request
                    </button>
                </>
            );
        case "friend":
            return (
                <>
                    <button
                        className="friend-button"
                        onClick={cancelFriendship}
                    >
                        Cancel Friendship
                    </button>
                </>
            );
    }
};

export default FriendButton;
