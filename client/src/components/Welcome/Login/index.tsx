import React, { useState } from "react";
import { Link } from "react-router-dom";
import store from "../../../redux/store";
import {initSocket} from "../../../socket";

interface UserAuthInfo {
    email: string;
    password: string;
}

interface UserAuthError {
    email: boolean;
    password: boolean;
}

const Login = () => {
    const [userAuthInfo, setUserAuthInfo] = useState<UserAuthInfo>({
        email: "",
        password: "",
    });

    const [errorObject, setErrorObject] = useState<UserAuthError>({
        email: false,
        password: false,
    });

    const [showError, setShowError] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = e.target.name;
        const value: string =
            name !== "password" ? e.target.value.trim() : e.target.value;

        setUserAuthInfo({
            ...userAuthInfo,
            [name]: value,
        });

        setErrorObject({
            ...errorObject,
            [name]: !!value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const complete: boolean = Object.values(errorObject).every(
            (value) => value === true
        );
        if (complete) {
            fetch("/login.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userAuthInfo),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        const socket = initSocket(store);
                        const {onlineUser} = data;
                        socket.emit("userOnline", onlineUser);
                        window.location.href = "/";
                    } else {
                        window.alert("Login failed");
                        setUserAuthInfo({
                            email: "",
                            password: "",
                        });

                        setErrorObject({
                            email: false,
                            password: false,
                        });

                        setShowError(false);
                    }
                });
        } else {
            setShowError(true);
        }
    };

    return (
        <>
            <div className="login-div">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">E-Mail </label>
                    <input
                        type="email"
                        name="email"
                        value={userAuthInfo.email}
                        onChange={handleInputChange}
                    />
                    {showError && !errorObject.email && (
                        <p className="error">
                            Please enter your e-Mail address.
                        </p>
                    )}
                    <label htmlFor="password">Password </label>
                    <input
                        type="password"
                        name="password"
                        value={userAuthInfo.password}
                        onChange={handleInputChange}
                    />
                    {showError && !errorObject.password && (
                        <p className="error">Please enter your password.</p>
                    )}
                    <p className="forgot"><Link to="/reset">Forgot your password?</Link></p>
                    <div className="button-container">
                        <button type="submit">Login</button>
                    </div>
                </form>
                <p className="switch"><Link to="/">Register</Link></p>
            </div>
        </>
    );
};

export default Login;
