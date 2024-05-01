import io from "../server.js";
import indexEvents from "./events/indexEvents.js";
import documentEvents from "./events/documentEvents.js"
import registerEvents from "./events/registerEvents.js";
import loginEvents from "./events/loginEvents.js";

io.on('connection', (socket) => {
    indexEvents(socket, io);
    documentEvents(socket, io);
    registerEvents(socket, io);
    loginEvents(socket, io);
});