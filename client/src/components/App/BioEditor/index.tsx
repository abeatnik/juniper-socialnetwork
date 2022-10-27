import React, { useState } from "react";
import "./style.css";

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
            body: JSON.stringify(newBio),
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
                        <button className="edit" onClick={editBio}>
                            Edit
                        </button>
                    </>
                )}
                {!props.currentBio && (
                    <button className="add" onClick={editBio}>
                        Add
                    </button>
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
                    <button className="save" onClick={saveBio}>
                        Save
                    </button>
                </div>
            </>
        );
    }
};

export default BioEditor;
