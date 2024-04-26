import { text } from "express";
import collection from "../config/db.connect.js";

function findDocument(name){
    const document = collection.findOne({name});
    return document;
}

function updateDocument(name, text){
    const document = collection.updateOne({name}, {$set: {text}})
    return document
}


export { findDocument, updateDocument };