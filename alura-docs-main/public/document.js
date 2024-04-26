import { emitTextEditor } from "./socket-front-document.js";


const textEditor = document.getElementById("editor-texto");

textEditor.addEventListener("keyup", () => {
    emitTextEditor(textEditor.value);
})

function updateTextEditor(new_text){
    textEditor.value = new_text;
}

export { updateTextEditor };