import "dotenv/config.js";
import io from "../server.js";
import indexEvents from "./events/indexEvents.js";
import documentEvents from "./events/documentEvents.js"
import registerEvents from "./events/registerEvents.js";
import loginEvents from "./events/loginEvents.js";
import { authUser } from "./midllewares/authUser.js";

const nspUser = io.of("/user");

nspUser.use(authUser);

nspUser.on('connection', (socket) => {
    indexEvents(socket, io);
    documentEvents(socket, io);
});

io.on('connection', (socket) => {
    registerEvents(socket, io);
    loginEvents(socket, io);
});