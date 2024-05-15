import { getCookie } from "../utils/cookie.js";
import { alertAndRedirect, successAuth, updateTextEditor, updateUserInterface } from "./document.js";

const socket = io("/user", {
    auth: {
        token: getCookie("tokenJwt")
    }
});

socket.on("successAuth", successAuth);


socket.on("connect_error", (error) => {
    alert(error);
    window.location.href = "/login/index.html";
});

function emitTextEditor(dados){
    socket.emit("text", dados); //Acionando um evento chamado "text" e passando o valor da caixa de texto
}

function selectDocument(data){
    socket.emit("selectDocument", data, (text) => {
        updateTextEditor(text);
    });
}

socket.on("documentUsers", updateUserInterface);

function emitExcludeDocument(documentName){
    socket.emit("excludeDocument", documentName);
}

socket.on("text_all_clients", (text) => {
    updateTextEditor(text) //Atualizando o valor da caixa de texto no frontend 
});

socket.on("successExcludeDocument", (documentName) => {
    alertAndRedirect(documentName);
});

export { emitTextEditor, selectDocument, emitExcludeDocument };