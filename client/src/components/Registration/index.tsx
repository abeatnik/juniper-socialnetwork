import React, { Component } from "react";

export default class Registration extends Component {
    render(): JSX.Element {
        return (
            <>
                <h2>Registration</h2>
                <form action="">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" name="firstname" id="firstname" />
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" name="lastname" id="lastname" />
                    <label htmlFor="email">E-Mail</label>
                    <input type="email" name="email" id="email" />
                    <label htmlFor="password">Choose a Password</label>
                    <input type="password" name="password" id="password" />
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already a user? Please <a href="/login">sign in</a>.
                </p>
            </>
        );
    }
}
