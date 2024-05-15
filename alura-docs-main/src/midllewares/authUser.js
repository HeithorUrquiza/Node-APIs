import jwt from "jsonwebtoken";

function authUser(socket, next){
    const tokenJwt = socket.handshake.auth.token;
    try {
        const payload = jwt.verify(tokenJwt, process.env.SECRET_JWT);
        socket.emit("successAuth", payload);
        next();
    } catch (error) {
        next(error);
    }
}

export { authUser };