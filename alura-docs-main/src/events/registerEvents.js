import { getRegister, registerUser } from "../dbUsers.js";

function registerEvents(socket, io){
    socket.on("registerUser", async (data) => {
        const user = await (getRegister(data.name)) === null;

        if(user){
            const result = await registerUser(data);    
            
            if (result.acknowledged) {
                socket.emit("successRegister");
            } else {
                socket.emit("failRegister");
            }
        } else {
            socket.emit("userExist");
        }
    })
}

export default registerEvents;