import { excludeDocument, findDocument, updateDocument } from "../dbDocuments.js";

function documentEvents(socket, io){
    socket.on("excludeDocument", async (documentName) => {
        const result = await excludeDocument(documentName);
        if (result.deletedCount) {
            io.emit("successExcludeDocument", documentName);
        }
    });

    socket.on('selectDocument', async (documentName, returnText) => {
        socket.join(documentName); //Cria um grupo para o socket
        
        const document = await findDocument(documentName);
        
        if (document) {
            returnText(document.text)
        }
    });

    socket.on('text', async ({ text, documentName }) => {
        // socket.broadcast.emit('text_all_clients', text); //Eviando informações para todos os clientes a partir do servidor
        const document = await updateDocument(documentName, text);
        if (document.modifiedCount) {
            socket.to(documentName).emit("text_all_clients", text);
        }
    });
}

export default documentEvents;