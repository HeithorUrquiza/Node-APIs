import { getRegister } from "../dbUsers.js";
import userAuthenticate from "../utils/userAuthenticate.js";

function loginEvents(socket, io){
    socket.on("authenticateUser", async ({ name, password }) => {
        const user = await getRegister(name);
       
        if (user) {
            const authenticated = userAuthenticate(password, user)
            if (authenticated) {
                socket.emit("successAuth");
            } else {
                socket.emit("failAuth");
            }
        } else {
            socket.emit("userNotFound");
        }
    });
}

export default loginEvents;