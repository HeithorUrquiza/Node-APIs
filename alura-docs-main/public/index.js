import addDocument from './socket-front-index.js';

const documentsList = document.getElementById("lista-documentos");
const form = document.getElementById("form-adiciona-documento");
const inputDocument = document.getElementById("input-documento");

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    addDocument(inputDocument.value);
    inputDocument.value = "";
});

function insertDocumentLink(documentName){
    documentsList.innerHTML += `
      <a href="document/index.html?nome=${documentName}" 
      class="list-group-item list-group-item-action"
      id="document-${documentName}"
      >
        ${documentName}
      </a>
    `;
}

function removeDocumentLink(documentName){
  const item = document.getElementById(`document-${documentName}`);
  documentsList.removeChild(item);
}

export { insertDocumentLink, removeDocumentLink };