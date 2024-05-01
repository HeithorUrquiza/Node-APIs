import { docCollection } from "../config/db.connect.js";

function getDocuments(){
    const documents = docCollection.find().toArray();
    return documents;
}

function addDocument(documentName){
    const document = docCollection.insertOne({
        name: documentName,
        text: ""
    });
    return document;
}

function excludeDocument(documentName){
    const document = docCollection.deleteOne({
        name: documentName
    });
    return document;
}

function findDocument(name){
    const document = docCollection.findOne({name});
    return document;
}

function updateDocument(name, text){
    const document = docCollection.updateOne({name}, {$set: {text}});
    return document;
}


export { findDocument, updateDocument, getDocuments, addDocument, excludeDocument };