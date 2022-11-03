import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { NewUser } from "../../component-interfaces";

interface ErrorObject {
    first: boolean;
    last: boolean;
    email: boolean;
    password: boolean;
}

const Registration = () => {
    const [errorObject, setErrorObject] = useState<ErrorObject>({
        first: false,
        last: false,
        email: false,
        password: false,
    });

    const [newUser, setNewUser] = useState<NewUser>({
        first: "",
        last: "",
        email: "",
        password: "",
    });

    const [showError, setShowError] = useState<boolean>(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        const value =
            name !== "password" ? e.target.value.trim() : e.target.value;

        setNewUser({
            ...newUser,
            [name]: value,
        });

        setErrorObject({
            ...errorObject,
            [name]: !!value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const pwRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/gm;
        const emailValidator: RegExp = /.+@.+\..+/;
        if (!newUser.password.match(pwRegex)) {
            setNewUser({
                ...newUser,
                password: "",
            });
            setErrorObject({
                ...errorObject,
                password: false,
            });
        }
        if (!newUser.email.match(emailValidator)) {
            setNewUser({
                ...newUser,
                email: "",
            });
            setErrorObject({
                ...errorObject,
                email: false,
            });
        }
        /// is it a problem that I am reading the state of the errorObject values right after a potential modification?
        const complete: boolean = Object.values(errorObject).every(
            (value) => value === true
        );
        if (complete) {
            fetch("/registration.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        window.location.href = "/";
                    } else {
                        window.alert("Registration failed");

                        setNewUser({
                            first: "",
                            last: "",
                            email: "",
                            password: "",
                        });

                        setErrorObject({
                            first: false,
                            last: false,
                            email: false,
                            password: false,
                        });
                    }
                });
        } else {
            setShowError(true);
        }
    };

    return (
        <>
            <div className="registration-div">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="first">First Name</label>
                    <input
                        type="text"
                        name="first"
                        value={newUser.first}
                        onChange={handleInputChange}
                    />
                    {showError && !errorObject.first && (
                        <p className="error">Please enter your First Name</p>
                    )}
                    <label htmlFor="last">Last Name</label>
                    <input
                        type="text"
                        name="last"
                        value={newUser.last}
                        onChange={handleInputChange}
                    />
                    {showError && !errorObject.last && (
                        <p className="error">Please enter your Last Name</p>
                    )}
                    <label htmlFor="email">E-Mail</label>
                    <input
                        type="email"
                        name="email"
                        value={newUser.email}
                        onChange={handleInputChange}
                    />
                    {showError && !errorObject.email && (
                        <p className="error">
                            Please enter your e-Mail address
                        </p>
                    )}
                    <label htmlFor="password">Choose a Password</label>
                    <input
                        type="password"
                        name="password"
                        value={newUser.password}
                        onChange={handleInputChange}
                    />
                    {showError && !errorObject.password && (
                        <p className="error">Please choose a valid password.</p>
                    )}
                    <p className="pw-info">
                        Your password should contain at least one lower- and one
                        upper-case-letter, one number and have a minimum length
                        of 6 characters
                    </p>
                    <div className="button-container">
                        <button type="submit">Register</button>
                    </div>
                </form>
                <p className="switch"><Link to="/login">Login</Link>.</p>
            </div>
        </>
    );
};

export default Registration;
