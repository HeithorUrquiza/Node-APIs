import { MongoClient } from "mongodb";

const client = new MongoClient(`mongodb+srv://admin:admin123@cluster0.0hnvpqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
let collection;

try {
    await client.connect();
    const db = client.db("websocket");
    collection = db.collection("documents");
    
    console.log("Conectado ao banco de dados");
} catch (error) {
    console.log(error);
}

export default collection;