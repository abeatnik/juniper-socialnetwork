import React, { Component } from "react";
import { Link } from "react-router-dom";
import { RegistrationTypes } from "./registration-types";

interface RegistrationProps {}

export default class Registration extends Component<
    RegistrationProps,
    RegistrationTypes.State
> {
    constructor(props: RegistrationProps) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            errors: {
                //how to access the object properties???
                firstname: false,
                lastname: false,
                email: false,
                password: false,
            },
            showError: false,
        };
    }

    render(): JSX.Element {
        return (
            <>
                <h2>Registration</h2>
                <form onSubmit={this.handleSubmit}>
                    {this.state.message && (
                        <p className="errorMessage">{this.state.message}</p>
                    )}
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleInputChange}
                    />
                    {this.state.showError && !this.state.errors.firstname && (
                        <p className="error">Please enter your First Name</p>
                    )}
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleInputChange}
                    />
                    {this.state.showError && !this.state.errors.lastname && (
                        <p className="error">Please enter your Last Name</p>
                    )}
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    {this.state.showError && !this.state.errors.email && (
                        <p className="error">
                            Please enter your e-Mail address
                        </p>
                    )}
                    <label htmlFor="password">Choose a Password</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    {this.state.showError && !this.state.errors.password && (
                        <p className="error">Please choose a valid password.</p>
                    )}
                    <p className="pw-info">
                        Your password should contain at least one lower- and one
                        upper-case-letter, one number and have a minimum length
                        of 6 characters
                    </p>

                    <button type="submit">Register</button>
                </form>
                <p>
                    Already a user? Please <Link to="/login">log in</Link>.
                </p>
            </>
        );
        ///same site rendering styling with css as anchor tag: a
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
        const pwRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/gm;
        const emailValidator: RegExp = /.+@.+\..+/;
        if (!this.state.password.match(pwRegex)) {
            this.setState({
                password: "",
                errors: Object.assign(this.state.errors, { password: false }),
            });
        }
        if (!this.state.email.match(emailValidator)) {
            this.setState({
                email: "",
                errors: Object.assign(this.state.errors, { email: false }),
            });
        }
        const complete: boolean = Object.values(this.state.errors).every(
            (value) => value === true
        );
        if (complete) {
            const newUser: RegistrationTypes.NewUser = {
                firstname: this.state.firstname.trim(),
                lastname: this.state.lastname.trim(),
                email: this.state.email.trim(),
                password: this.state.password,
            };
            fetch("/registration.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        location.reload();
                    } else {
                        window.alert("Registration failed");
                        this.setState({
                            firstname: "",
                            lastname: "",
                            email: "",
                            password: "",
                            errors: {
                                //how to access the object properties???
                                firstname: false,
                                lastname: false,
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