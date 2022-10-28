import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Registration from "./Registration/index";
import Login from "./Login/index";
import ResetPassword from "./ResetPassword";
import Logo from "../App/Logo";
import "./style.css";

const Welcome = () => {
    return (
        <>
            <div className="welcome-window">
                <div className="intro">
                    <div className="welcome-logo">
                        <Logo />
                    </div>
                    <h1>Welcome!</h1>
                    <p>
                        Did you miss out on the early days of the World Wide
                        Web?
                    </p>
                    <p>Do you feel the nostalgia? </p>
                    <p>
                        Connect with your friends like it's the dawning of
                        something great.
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
};

export default Welcome;
