import { render } from "@testing-library/react";

const Logout = () => {
    const userLogout = () => {
        fetch("/logout").then(() => {
            window.location.replace("/login");
        });
    };

    return (
        <>
            <button className="logout" onClick={userLogout}>
                <div className="icon">Logout</div>
            </button>
        </>
    );
};

export default Logout;
