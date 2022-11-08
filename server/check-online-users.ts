const onlineUsers: any = {};


export const addOnlineUser = (userId: string, socketId: string) => {
    if (onlineUsers.hasOwnProperty(userId)) {
        onlineUsers[userId].push(socketId);
        return;
    } 
    onlineUsers[userId] = [socketId];
}


export const checkOnlineUsers = (allSocketIds: string[]) => {
    Object.keys(onlineUsers).forEach(userId => {
        onlineUsers[userId].forEach((socketId: string )=> {
            if (!allSocketIds.includes(socketId)) {
                onlineUsers[userId] = onlineUsers[userId].filter((socket: string)=> socket !== socketId);
            }
            if (onlineUsers[userId].length === 0){
                delete onlineUsers[userId];
            }
        })
    })
    return onlineUsers;
}

