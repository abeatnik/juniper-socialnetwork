import {RootState} from "../../../redux/store";
import { useSelector } from "react-redux";
import UserComponent from "../UserComponent";
import { User } from "../../component-interfaces";
import "./style.css";
import { useEffect } from "react";

const OnlineUsers = () => {
    const onlineUsers = useSelector((state: RootState)=> {
        return state.onlineUsers;
    });

    let onlineUserList = onlineUsers.map((user: User) => (
        <li className="online-user" key={user.id}>
            <UserComponent user={user} />
        </li>
    ));

    useEffect(()=> {
        onlineUserList = onlineUsers.map((user: User) => (
        <li className="online-user" key={user.id}>
            <UserComponent user={user} />
        </li> 
        ));
    },[onlineUsers])

    return (
        <>
            <h4>Online Users:</h4>
            <ul className="online-user-list">{onlineUserList}</ul>
        </>
    )



};


export default OnlineUsers;