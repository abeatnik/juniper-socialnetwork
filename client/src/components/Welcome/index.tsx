import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./Registration/index";
import Login from "./Login/index";
import ResetPassword from "./ResetPassword";
import "./style.css";

export default class Welcome extends Component {
    render() {
        return (
            <>
                <div className="header"></div>
                <BrowserRouter>
                    <div className="welcome-main">
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
                <div className="footer"></div>
            </>
        );
    }
}
