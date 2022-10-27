import { render } from "@testing-library/react";

const Logout = () => {
    const userLogout = () => {
        fetch("/logout").then(() => {
            window.location.reload();
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
