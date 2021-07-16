// Node server to handle SocketIO connections
const io = require("socket.io")(8000);
const users = {};

io.on('connection', socket=>{
    /* Notifying the rest of the users that a new user has joined the chat */
    socket.on('new-user-joined', name=>{
        console.log("New user", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    /* Broadcasting the message sent by a user */
    socket.on('send', message=>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    /* Notifying that a user has left the chat */
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})
