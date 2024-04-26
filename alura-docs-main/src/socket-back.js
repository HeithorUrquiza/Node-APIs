import { findDocument, updateDocument } from "./dbDocuments.js";
import io from "../server.js";


io.on('connection', (socket) => {
    console.log(`Um usuário foi conectado ${socket.id}`);

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