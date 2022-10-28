import React, { useState, useEffect } from "react";

const FriendButton = (props: { ownerId: string }) => {
    const [relation, setRelation] = useState<
        "none" | "sent" | "received" | "friend" | null
    >(null);

    const buttonInner = {
        none: "Send Friend Request",
        sent: "Cancel Friend Request",
        received: "Accept Friend Request",
        friend: "Unfriend",
    };

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

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (relation) {
            fetch(`/friend-request/${relation}/${props.ownerId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setRelation(data.newRelation);
                    }
                });
        }
    };

    return (
        <>
            <button className="friend-button" onClick={handleClick}>
                {relation && buttonInner[relation]}
            </button>
        </>
    );
};

export default FriendButton;
