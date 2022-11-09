import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Registration from "./Registration/index";
import Login from "./Login/index";
import ResetPassword from "./ResetPassword";
import "./style.css";

const Welcome = () => {
    return (
        <>
            <div className="welcome-window">
                <div className="intro">
                    <div className="welcome-logo">
                        <div className="logo">
                            <img src="/assets/heart.svg" alt="logo" />
                        </div>
                    </div>
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
                        <Route path="*">
                            <Redirect to="/login" />
                        </Route>
                    </div>
                </BrowserRouter>
                <div className="ticker1">
                    <p>
                        + + + Stop questioning whether you need another social
                        network + + + Stop questioning whether you need another
                        social network + + + Stop questioning whether you need
                        another social network + + + Stop questioning whether
                        you need another social network + + + Stop questioning
                        whether you need another social network + + + Stop
                        questioning whether you need another social network + +
                        + Stop questioning whether you need another social
                        network + + + Stop questioning whether you need another
                        social network + + + Stop questioning whether you need
                        another social network + + +{" "}
                    </p>
                </div>
                <div className="ticker2">
                    <p>
                        + + + Stop questioning whether you need another social
                        network + + + Stop questioning whether you need another
                        social network + + + Stop questioning whether you need
                        another social network + + + Stop questioning whether
                        you need another social network + + + Stop questioning
                        whether you need another social network + + + Stop
                        questioning whether you need another social network + +
                        + Stop questioning whether you need another social
                        network + + + Stop questioning whether you need another
                        social network + + + Stop questioning whether you need
                        another social network + + +{" "}
                    </p>
                </div>
            </div>
            <div className="footer"></div>
        </>
    );
};

export default Welcome;
