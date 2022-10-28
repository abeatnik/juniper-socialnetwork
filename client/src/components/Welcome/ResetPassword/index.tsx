import { useState } from "react";
import { Link } from "react-router-dom";

interface ResetPW {
    email: string;
    code: string;
    newPassword: string;
}

const ResetPassword = () => {
    const [userExists, setUserExists] = useState<boolean>(false);
    const [userAuthenticated, setUserAuthenticated] = useState<boolean>(false);
    const [userData, setUserData] = useState<ResetPW>({
        email: "",
        code: "",
        newPassword: "",
    });
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "email") {
            setUserData({
                ...userData,
                email: e.target.value,
            });
        } else if (e.target.name === "code") {
            setUserData({
                ...userData,
                code: e.target.value,
            });
        } else if (e.target.name === "newPassword") {
            setUserData({
                ...userData,
                newPassword: e.target.value,
            });
        }
    };

    const handleSubmit1 = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userData.email && e.currentTarget.name === "send") {
            fetch("/reset1", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: userData.email }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        setUserExists(true);
                    } else {
                        window.alert(
                            "Failed! Could not reset password. Please try again."
                        );
                        setUserData({
                            ...userData,
                            email: "",
                        });
                    }
                });
        }
    };

    const handleSubmit2 = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (userData.code && userData.newPassword) {
            const pwRegex: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/gm;
            if (!userData.newPassword.match(pwRegex)) {
                setUserData({
                    ...userData,
                    newPassword: "",
                });
                setErrorMessage("Please choose a valid Password.");
            } else {
                fetch("/reset2", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        code: userData.code,
                        newPassword: userData.newPassword,
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (!!data.success) {
                            setUserAuthenticated(true);
                        }
                    });
            }
        }
    };

    if (!userExists) {
        return (
            <>
                <div className="reset-pw-div">
                    <h2>Reset Password</h2>
                    <form name="send" onSubmit={handleSubmit1}>
                        <p>Please enter your registration email.</p>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                        <div className="button-container">
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                </div>
            </>
        );
    } else if (userExists && !userAuthenticated) {
        return (
            <>
                <div className="reset-pw-div">
                    <h2>Reset Password</h2>
                    <form onSubmit={handleSubmit2}>
                        <p>Please enter the verification code.</p>
                        <input
                            type="text"
                            name="code"
                            placeholder="verification code"
                            value={userData.code}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="password">Enter a new Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={userData.newPassword}
                            onChange={handleInputChange}
                        />
                        {errorMessage && (
                            <p className="error">{errorMessage}</p>
                        )}
                        <p className="pw-info">
                            Your password should contain at least one lower- and
                            one upper-case-letter, one number and have a minimum
                            length of 6 characters
                        </p>
                        <div className="button-container">
                            <button type="submit">Update Password</button>
                        </div>
                    </form>
                </div>
            </>
        );
    } else if (userAuthenticated) {
        return (
            <>
                <div className="reset-pw-div">
                    <p>Success! Your password has been updated.</p>
                    <p>
                        You can now <Link to="/login">log in</Link> with your
                        new password.
                    </p>
                </div>
            </>
        );
    }
};

export default ResetPassword;
