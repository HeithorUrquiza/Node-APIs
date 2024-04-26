import { updateTextEditor } from "./document.js";

const socket = io();

function emitTextEditor(text){
    socket.emit("text", text); //Acionando um evento chamado "text" e passando o valor da caixa de texto
}

socket.on('text_all_clients', (text) => {
    updateTextEditor(text) //Atualizando o valor da caixa de texto no frontend 
})

export { emitTextEditor };