import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "../Registration/index";

export default class Welcome extends Component {
    render() {
        return (
            <>
                <h2>Welcome</h2>
                <BrowserRouter>
                    <Route exact path="/">
                        <Registration />
                    </Route>
                    <Route path="/login">Login here</Route>
                </BrowserRouter>
            </>
        );
    }
}
