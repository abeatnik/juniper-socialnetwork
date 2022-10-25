import React, { Component } from "react";
import { Link } from "react-router-dom";
import { LoginTypes } from "./login-types";

interface LoginProps {}

export default class Login extends Component<LoginProps, LoginTypes.State> {
    constructor(props: LoginProps) {
        super(props);

        this.state = {
            email: "",
            password: "",
            errors: {
                email: false,
                password: false,
            },
            showError: false,
        };
    }

    render(): JSX.Element {
        return (
            <>
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.state.message && (
                        <p className="errorMessage">{this.state.message}</p>
                    )}
                    <label htmlFor="email">E-Mail </label>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    {this.state.showError && !this.state.errors.email && (
                        <p className="error">
                            Please enter your e-Mail address.
                        </p>
                    )}
                    <label htmlFor="password">Password </label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    {this.state.showError && !this.state.errors.password && (
                        <p className="error">Please enter your password.</p>
                    )}
                    <button type="submit">Login</button>
                </form>
                <p>
                    Forgot your password? Click <Link to="/reset">here</Link>.
                </p>
                <p>
                    Not yet a user? Please <Link to="/">sign up</Link>.
                </p>
            </>
        );
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        const value: string = e.target.value;
        const exists: boolean = !!value;
        this.setState({
            // bc not all the keys are optional i always need to set them. So I deconstruct and set the one that I want
            errors: Object.assign(this.state.errors, { [name]: exists }),
            ...this.state,
            [name]: value,
        });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const complete: boolean = Object.values(this.state.errors).every(
            (value) => value === true
        );
        if (complete) {
            fetch("/login.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: this.state.email.trim(),
                    password: this.state.password,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        //userId....
                        location.href = "/";
                    } else {
                        window.alert("Login failed");
                        this.setState({
                            email: "",
                            password: "",
                            errors: {
                                //how to access the object properties???

                                email: false,
                                password: false,
                            },
                            showError: false,
                        });
                    }
                });
        } else {
            this.setState({
                showError: true,
            });
        }
    };
}
