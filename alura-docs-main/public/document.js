import { emitExcludeDocument, emitTextEditor, selectDocument } from "./socket-front-document.js";

const params = new URLSearchParams(window.location.search); //Pega todos os parametros da URL
const documentName = params.get("nome"); //Recuperamos o valor do parâmetro 'nome'

const textEditor = document.getElementById("editor-texto");
const documentTitle = document.getElementById("titulo-documento");
const excludeBotton = document.getElementById("excluir-documento");

documentTitle.textContent = documentName || "Documento sem título"; //Atualiza o título do documento

selectDocument(documentName)

textEditor.addEventListener("keyup", () => {
    emitTextEditor({
        text: textEditor.value,
        documentName,
    });
})

excludeBotton.addEventListener("click", () => {
    emitExcludeDocument(documentName);
})

function updateTextEditor(new_text){
    textEditor.value = new_text;
}

function alertAndRedirect(name){
    if (name == documentName){
        alert(`Documento ${name} excluído!`);
        window.location.href = "/";
    }
}

export { updateTextEditor, alertAndRedirect };