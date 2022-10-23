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
        };
    }

    render(): JSX.Element {
        return (
            <>
                <h2>Registration</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="firstname">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="lastname">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleInputChange}
                    />
                    <label htmlFor="password">Choose a Password</label>
                    <input
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already a user? Please <Link to="/login">sign in</Link>.
                    ///same site rendering styling with css as anchor tag: a
                </p>
            </>
        );
    }

    handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const pwRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/gm;
        const emailValidator: RegExp = /.+@.+\..+/;
        /// here I can implement password and email validation
        const name: string = e.target.name;
        const value: string = e.target.value;
        const exists: boolean = !!value;
        console.log(this.state.errors);
        console.log(exists);
        console.log(
            this.setState({
                // bc not all the keys are optional i always need to set them. So I deconstruct and set the one that I want
                errors: Object.assign(this.state.errors, { [name]: exists }),
                ...this.state,
                [name]: value,
            })
        );
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            console.log(newUser);
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
                        //show message that the registration failed
                    }
                });
        } else {
            //render error message of property that is wrong missing -> update components state, change state interface first
        }
    };
}
