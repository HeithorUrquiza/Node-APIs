const documentConections = [];

function addConection(connection) {
    documentConections.push(connection);
}

function getDocumentUser(documentName) {
    return documentConections
        .filter((connection) => connection.documentName === documentName)
        .map((connection) => connection.userName);
}

export { addConection, getDocumentUser }