import { addDocument, excludeDocument, findDocument, getDocuments, updateDocument } from "./dbDocuments.js";
import io from "../server.js";


io.on('connection', (socket) => {
    socket.on('getDocuments', async (returnDocuments) => {
        const documents = await getDocuments();
        returnDocuments(documents);
    })

    socket.on("addDocument", async (documentName) => {
        const documentExist = (await findDocument(documentName)) !== null;

        if (documentExist) {
            socket.emit("documentExist", documentName);
        } else {
            const result = await addDocument(documentName);
            
            if (result.acknowledged) {
                io.emit("addInterfaceDocument", documentName);
            }
        }

    })

    socket.on("excludeDocument", async (documentName) => {
        const result = await excludeDocument(documentName);
        if (result.deletedCount) {
            io.emit("successExcludeDocument", documentName);
        }
    })

    socket.on('selectDocument', async (documentName, returnText) => {
        socket.join(documentName); //Cria um grupo para o socket
        
        const document = await findDocument(documentName);
        
        if (document) {
            returnText(document.text)
        }
    })

    socket.on('text', async ({ text, documentName }) => {
        // socket.broadcast.emit('text_all_clients', text); //Eviando informações para todos os clientes a partir do servidor
        const document = await updateDocument(documentName, text);
        if (document.modifiedCount) {
            socket.to(documentName).emit("text_all_clients", text);
        }
    })
});