import 'dotenv/config';
import express from 'express';
import url from 'url';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import './config/db.connect.js'

const app = express();
const port = process.env.port || 3000;

const currentPath = url.fileURLToPath(import.meta.url); // Caminho completo do diretório atual
const publicPath = path.join(currentPath, 'public'); // Caminho para o diretório público
app.use(express.static(publicPath));

const serverHttp = http.createServer(app);

serverHttp.listen(port, () => console.log(`Servidor ouvindo na porta ${port}`));

const io = new Server(serverHttp);

export default io;