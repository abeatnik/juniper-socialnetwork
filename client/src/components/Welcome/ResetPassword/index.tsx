import { Component } from "react";
import { Link } from "react-router-dom";

interface ResetPWState {
    email: string;
    code?: string;
    newPassword?: string;
    userExists: boolean;
    updated: boolean;
    errorMessage?: string;
}

interface ResetPWProps {}

export default class ResetPassword extends Component<
    ResetPWProps,
    ResetPWState
> {
    constructor(props: ResetPWProps) {
        super(props);

        this.state = {
            email: "",
            userExists: false,
            updated: false,
        };
    }

    render(): JSX.Element {
        if (!this.state.userExists) {
            return (
                <>
                    <div className="reset-pw-div">
                        <h2>Reset Password</h2>
                        <form name="send" onSubmit={this.handleSubmit1}>
                            <p>Please enter your registration email.</p>
                            <input
                                type="email"
                                name="email"
                                placeholder="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                            />
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </>
            );
        } else if (this.state.userExists && !this.state.updated) {
            return (
                <>
                    <div className="reset-pw-div">
                        <h2>Reset Password</h2>
                        <form onSubmit={this.handleSubmit2}>
                            <p>Please enter the verification code.</p>
                            <input
                                type="text"
                                name="code"
                                placeholder="verification code"
                                value={this.state.code}
                                onChange={this.handleInputChange}
                            />
                            <label htmlFor="password">
                                Enter a new Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={this.state.newPassword}
                                onChange={this.handleInputChange}
                            />
                            {this.state.errorMessage && (
                                <p className="error">
                                    {this.state.errorMessage}
                                </p>
                            )}
                            <p className="pw-info">
                                Your password should contain at least one lower-
                                and one upper-case-letter, one number and have a
                                minimum length of 6 characters
                            </p>
                            <button type="submit">Update Password</button>
                        </form>
                    </div>
                </>
            );
        } else if (this.state.userExists && this.state.updated) {
            return (
                <>
                    <div className="reset-pw-div">
                        <p>Success! Your password has been updated.</p>
                        <p>
                            You can now <Link to="/login">log in</Link> with
                            your new password.
                        </p>
                    </div>
                </>
            );
        }
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            this.setState({
                email: e.target.value,
            });
        } else if (e.target.name === "code") {
            this.setState({
                code: e.target.value,
            });
        } else if (e.target.name === "newPassword") {
            this.setState({
                newPassword: e.target.value,
            });
        }
    };
    handleSubmit1 = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.state.email && e.currentTarget.name === "send") {
            fetch("/reset1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: this.state.email }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        this.setState({
                            ...this.state,
                            userExists: true,
                        });
                    } else {
                        window.alert(
                            "Failed! Could not reset password. Please try again."
                        );
                        this.setState({
                            email: "",
                            userExists: false,
                            updated: false,
                        });
                    }
                });
        }
    };
    handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (this.state.code && this.state.newPassword) {
            const pwRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/gm;
            if (!this.state.newPassword.match(pwRegex)) {
                this.setState({
                    newPassword: "",
                    errorMessage: "Please choose a valid Password.",
                });
            } else {
                fetch("/reset2", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: this.state.email,
                        code: this.state.code,
                        newPassword: this.state.newPassword,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (!!data.success) {
                            this.setState({
                                updated: true,
                            });
                        }
                    });
            }
        }
    };
}
