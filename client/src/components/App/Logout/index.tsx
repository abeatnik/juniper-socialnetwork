import { socket } from "../../../socket";

const Logout = () => {

    const userLogout = () => {
        fetch("/logout").then(response => response.json()).then(data => {
            if(data.success){
                socket.emit('userWentOffline');
                window.location.replace("/login");
            }
            
        });
    };

    return (
        <>
            <div className="button-container">
                <button className="logout" onClick={userLogout}>
                    <div className="icon">Logout</div>
                </button>
            </div>
        </>
    );
};

export default Logout;
