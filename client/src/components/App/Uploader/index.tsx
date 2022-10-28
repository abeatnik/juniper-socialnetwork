import React from "react";
import "./style.css";

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

    goToProfile = (e: React.MouseEvent<HTMLDivElement>) => {
        e.target === e.currentTarget && window.location.replace("/");
    };

    render() {
        return (
            <>
                <div className="uploader-background" onClick={this.goToProfile}>
                    <div className="uploader">
                        <h2>Change your Profile Picture</h2>
                        <form
                            encType="multipart/form-data"
                            onSubmit={this.handleFormSubmit}
                        >
                            <input
                                type="file"
                                name="profilePic"
                                accept="image/*"
                                ref={this.fileInput}
                            />
                            <div className="button-container">
                                <button type="submit">Upload</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
