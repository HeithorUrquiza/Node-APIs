import io from "./server.js";

io.on('connection', (socket) => {
    console.log(`Um usuário foi conectado ${socket.id}`);

    socket.on('text', (text) => {
        socket.broadcast.emit('text_all_clients', text); //Eviando informações para todos os clientes a partir do servidor
    })

});