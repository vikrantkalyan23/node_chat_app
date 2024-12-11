const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

// Serve HTML file for chat interface
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('set_username', (username) => {
        socket.username = username;
    });

    socket.on('chat_message', (msg) => {
        const timestamp = new Date().toLocaleTimeString();
        io.emit('chat_message', { user: socket.username, message: msg, time: timestamp });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Chat app running at http://localhost:3000');
});
