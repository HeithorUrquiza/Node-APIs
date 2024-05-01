const socket = io();

function emitUserRegister(data){
    socket.emit("registerUser", data);
}

socket.on("successRegister", () => alert("Cadastro realizado com sucesso!"));
socket.on("failRegister", () => alert("Falha no cadastro!"));
socket.on("userExist", () => alert("Usuário já existe"));

export default emitUserRegister;