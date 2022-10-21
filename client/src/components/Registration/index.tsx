import React, { Component, useCallback } from "react";
import { Link } from "react-router-dom";

interface RegistrationState {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    errors: {
        firstname: boolean;
        lastname: boolean;
        email: boolean;
        password: boolean;
    };
    message?: string;
}

interface RegistrationProps {}

export default class Registration extends Component<
    RegistrationProps,
    RegistrationState
> {
    constructor(props: RegistrationProps) {
        super(props);

        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            errors: {
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
        const name: string = e.target.name;
        const value: string = e.target.value;
        this.setState({
            // bc not all the keays are optional i always need to set them. So I deconstruct and set the one that I want
            ...this.state,
            [name]: value,
        });
    };

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(this.state);
    };
}
