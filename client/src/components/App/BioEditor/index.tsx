import React, { Component } from "react";
import "./style.css";

interface BioEditorProps {
    currentBio: string;
    updateBio: Function;
}
interface BioEditorState {
    editingMode: boolean;
    bioDraft: string;
}

export default class BioEditor extends Component<
    BioEditorProps,
    BioEditorState
> {
    constructor(props: BioEditorProps) {
        super(props);
        this.state = {
            editingMode: false,
            bioDraft: "",
        };
    }

    editBio = () => {
        this.setState({
            editingMode: true,
            bioDraft: this.props.currentBio,
        });
    };

    saveBio = () => {
        const newBio = this.state.bioDraft;
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
                    this.props.updateBio(newBio);
                    this.setState({
                        editingMode: false,
                    });
                }
            });
    };

    handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            bioDraft: e.target.value,
        });
    };

    render() {
        console.log("bio editor render", this.props.currentBio);
        if (!this.state.editingMode) {
            return (
                <>
                    {this.props.currentBio && (
                        <>
                            <p className="bio-text">{this.props.currentBio}</p>
                            <button className="edit" onClick={this.editBio}>
                                Edit
                            </button>
                        </>
                    )}
                    {!this.props.currentBio && (
                        <button className="add" onClick={this.editBio}>
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
                            value={this.state.bioDraft}
                            onChange={this.handleInputChange}
                        ></textarea>
                        <button className="save" onClick={this.saveBio}>
                            Save
                        </button>
                    </div>
                </>
            );
        }
    }
}
