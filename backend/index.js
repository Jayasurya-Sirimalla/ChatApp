const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const cors = require('cors');
const router = require('./router');
const { getUsersInRoom, getUser, userDelete, userAdd } = require('./users/users');

const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);
app.use(router);
app.use(cors());
server.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

io.on('connection', (socket) => {
    console.log("new connection!!!")
    socket.on('join',({name,room}, errorMsg) => {
        const {user, error} = userAdd({id: socket.id, name,room});
        if(error) return errorMsg(error);
        socket.join(user.room);
        socket.emit('message', {user: 'admin', text : `Hey ${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text : `${user.name} has joined`});
        io.to(user.room).emit('roomData', {room: user.room , users: getUsersInRoom(user.room)})
    })
    socket.on('sendMessage', (message, cb) => {
        const user = getUser(socket.id);
        if(user)
        io.to(user.room).emit('message', {user: user.name , text: message})
        cb();
    })
    socket.on('disconnect', () => {
        const user = userDelete(socket.id);
        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left the chat`})
            io.to(user.room).emit('roomData', {room: user.room , users: getUsersInRoom(user.room)})
        }
    })
})
 