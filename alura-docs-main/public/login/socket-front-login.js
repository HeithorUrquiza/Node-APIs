import { createCookie } from "../utils/cookie.js";

const socket = io();

function emitAuthenticateUser(data){
    socket.emit("authenticateUser", data);
}

socket.on("successAuth", (tokenJwt) => {
    createCookie("tokenJwt", tokenJwt);
    alert("Usuário autenticado com sucesso!");
    window.location.href = "/";
})
socket.on("failAuth", () => alert("Erro de autenticação"));
socket.on("userNotFound", () => alert("Usuário não encontrado"));

export { emitAuthenticateUser };