import { addDocument, findDocument, getDocuments } from "../dbDocuments.js";

function indexEvents(socket, io){
    socket.on('getDocuments', async (returnDocuments) => {
        const documents = await getDocuments();
        returnDocuments(documents);
    });

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
    });
}

export default indexEvents;