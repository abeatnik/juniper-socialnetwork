import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./Registration/index";
import Login from "./Login/index";
import ResetPassword from "./ResetPassword";

export default class Welcome extends Component {
    render() {
        return (
            <>
                <h2>Welcome</h2>
                <BrowserRouter>
                    <div>
                        <Route exact path="/">
                            <Registration />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/reset">
                            <ResetPassword />
                        </Route>
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
