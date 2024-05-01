import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.CONNECTION);
let docCollection, usersCollection;

try {
    await client.connect();
    const db = client.db("websocket");
    docCollection = db.collection("documents");
    usersCollection = db.collection("users");

    console.log("Conectado ao banco de dados");
} catch (error) {
    console.log(error);
}

export { docCollection, usersCollection };