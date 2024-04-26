import { updateTextEditor } from "./document.js";

const socket = io();

function emitTextEditor(dados){
    socket.emit("text", dados); //Acionando um evento chamado "text" e passando o valor da caixa de texto
}

function selectDocument(documentName){
    socket.emit("selectDocument", documentName, (text) => {
        updateTextEditor(text);
    })
}

socket.on("text_all_clients", (text) => {
    updateTextEditor(text) //Atualizando o valor da caixa de texto no frontend 
})

export { emitTextEditor, selectDocument };