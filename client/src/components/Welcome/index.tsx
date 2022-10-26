import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./Registration/index";
import Login from "./Login/index";
import ResetPassword from "./ResetPassword";
import Logo from "../App/Logo";
import "./style.css";

export default class Welcome extends Component {
    render() {
        return (
            <>
                <div className="header"></div>
                <div className="welcome-grid">
                    <div className="intro">
                        <h1>Welcome!</h1>
                        <div className="welcome-logo">
                            <Logo />
                        </div>
                        <p>
                            Connect with intergalactic friends and meet your
                            alter ego from a different universe!
                        </p>
                    </div>
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
                </div>
                <div className="footer"></div>
            </>
        );
    }
}
