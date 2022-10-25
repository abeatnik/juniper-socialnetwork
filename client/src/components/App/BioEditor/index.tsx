import React, { Component } from "react";

interface BioEditorProps {
    currentBio: string;
    saveBio: React.MouseEventHandler<HTMLButtonElement>;
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
            bioDraft: this.props.currentBio,
        };
    }

    editBio = () => {
        this.setState({
            editingMode: true,
        });
    };

    handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            bioDraft: e.target.value,
        });
    };

    render() {
        if (!this.state.editingMode) {
            return (
                <>
                    {this.props.currentBio && (
                        <button className="edit" onClick={this.editBio}>
                            Edit
                        </button>
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
                    <textarea
                        name="editbiotext"
                        id="editbiotext"
                        cols={20}
                        rows={50}
                        value={this.state.bioDraft}
                        onChange={this.handleInputChange}
                    ></textarea>
                    <button className="save" onClick={this.props.saveBio}>
                        Save
                    </button>
                </>
            );
        }
    }
}
