import "./style.css";

const Logo = () => {
    const takeMeHome = () => {
        window.location.replace("/");
    };

    return (
        <>
            <div className="logo" onClick={takeMeHome}>
                <img src="/assets/home.svg" alt="logo" />
            </div>
        </>
    );
};

export default Logo;
