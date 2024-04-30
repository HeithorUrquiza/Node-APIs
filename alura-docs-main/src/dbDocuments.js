import collection from "../config/db.connect.js";

function getDocuments(){
    const documents = collection.find().toArray();
    return documents;
}

function addDocument(documentName){
    const document = collection.insertOne({
        name: documentName,
        text: ""
    });
    return document;
}

function excludeDocument(documentName){
    const document = collection.deleteOne({
        name: documentName
    });
    return document;
}

function findDocument(name){
    const document = collection.findOne({name});
    return document;
}

function updateDocument(name, text){
    const document = collection.updateOne({name}, {$set: {text}});
    return document;
}


export { findDocument, updateDocument, getDocuments, addDocument, excludeDocument };