import React from "react";

interface UploaderProps {
    setProfilePic: Function;
}

export default class Uploader extends React.PureComponent<UploaderProps> {
    private fileInput = React.createRef<HTMLInputElement>();

    handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const file = this.fileInput.current.files[0];
        const formData = new FormData();
        formData.append("file", file);
        fetch("/profile-pic", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                const newUrl = data.url;
                this.props.setProfilePic(newUrl);
            });
    };

    render() {
        return (
            <>
                <h2>Change your Profile Picture</h2>
                <form
                    encType="multipart/form-data"
                    onSubmit={this.handleFormSubmit}
                >
                    <label htmlFor="profilePic">File</label>
                    <input
                        type="file"
                        name="profilePic"
                        accept="image/*"
                        ref={this.fileInput}
                    />
                    <button type="submit">Upload</button>
                </form>
            </>
        );
    }
}
