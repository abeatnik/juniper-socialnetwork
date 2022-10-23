import { Component } from "react";
import { Link } from "react-router-dom";

interface ResetPWState {
    email: string;
    verificationCode?: string;
    newPassword?: string;
    userExists: boolean;
    updated: boolean;
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
                    <h2>Reset Password</h2>
                    <form name="send" onSubmit={this.handleSubmit}>
                        <p>Please enter your registration email.</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                        />
                    </form>
                </>
            );
        } else if (this.state.userExists && !this.state.updated) {
            return (
                <>
                    <h2>Reset Password</h2>
                    <form onSubmit={this.handleSubmit}>
                        <p>Please enter the verification code.</p>
                        <input
                            type="text"
                            name="verificationCode"
                            placeholder="verification code"
                            value={this.state.verificationCode}
                            onChange={this.handleInputChange}
                        />
                        <label htmlFor="password">Enter a new Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={this.state.newPassword}
                            onChange={this.handleInputChange}
                        />
                        <button type="submit">Update Password</button>
                    </form>
                </>
            );
        } else {
            return (
                <>
                    <h2>Reset Password</h2>
                    <p>Success! Your password has been updated.</p>
                    <p>
                        You can now <Link to="/login">log in</Link> with your
                        new password.
                    </p>
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
                verificationCode: e.target.value,
            });
        }
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!!this.state.email && e.currentTarget.name === "send") {
            fetch("/reset1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(this.state.email),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (!!data.success) {
                        this.setState({
                            ...this.state,
                            userExists: true,
                        });
                    }
                });
        } else if (this.state.verificationCode && this.state.newPassword) {
            fetch("/reset2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: this.state.email,
                    verificationCode: this.state.verificationCode,
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
    };
}
