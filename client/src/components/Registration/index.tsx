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
                </form>
            </>
        );
    }
}
