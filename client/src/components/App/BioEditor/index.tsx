import React, { useState } from "react";

const BioEditor = (props: { currentBio: string; updateBio: Function }) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [draftBio, setDraftBio] = useState<string>("");

    const editBio = () => {
        setEditMode(true);
        setDraftBio(props.currentBio);
    };

    const saveBio = () => {
        const newBio = draftBio;
        fetch("/save-bio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ newBio }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    props.updateBio(newBio);
                    setEditMode(false);
                }
            });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDraftBio(e.target.value);
    };

    if (!editMode) {
        return (
            <>
                {props.currentBio && (
                    <>
                        <p className="bio-text">{props.currentBio}</p>
                        <div className="button-container">
                            <button className="edit" onClick={editBio}>
                                Edit
                            </button>
                        </div>
                    </>
                )}
                {!props.currentBio && (
                    <>
                        <div className="button-container">
                            <button className="add" onClick={editBio}>
                                Add
                            </button>
                        </div>
                    </>
                )}
            </>
        );
    } else {
        return (
            <>
                <div className="bio-editor">
                    <textarea
                        name="editbiotext"
                        id="editbiotext"
                        cols={30}
                        rows={10}
                        value={draftBio}
                        onChange={handleInputChange}
                    ></textarea>
                    <>
                        <div className="button-container">
                            <button className="save" onClick={saveBio}>
                                Save
                            </button>
                        </div>
                    </>
                </div>
            </>
        );
    }
};

export default BioEditor;
