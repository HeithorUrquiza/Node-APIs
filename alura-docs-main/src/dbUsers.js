import { usersCollection } from "../config/db.connect.js"
import hashAndSalt from "./utils/hashAndSalt.js";

function getRegister(name){
    return usersCollection.findOne({ name });
}

function registerUser({ name, password }){
    const { hashPassword, saltPassword } = hashAndSalt(password);
    return usersCollection.insertOne({ name, hashPassword, saltPassword });
}


export { registerUser, getRegister };