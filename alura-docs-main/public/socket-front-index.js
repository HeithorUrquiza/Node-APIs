import { insertDocumentLink, removeDocumentLink } from "./index.js";

const socket = io();

socket.emit('getDocuments', (documents) => {
    documents.forEach(doc => {
        insertDocumentLink(doc.name);
    });
});

socket.on("addInterfaceDocument", (documentName) => {
    insertDocumentLink(documentName);
})

socket.on("documentExist", (documentName) => {
    alert(`O documento ${documentName} já existe`);
})

socket.on("successExcludeDocument", (documentName) => {
    removeDocumentLink(documentName);
})

function addDocument(documentName){
    socket.emit("addDocument", documentName);
}

export default addDocument;