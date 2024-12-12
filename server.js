const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files
app.use(express.static('public'));

io.on('connection', (socket) => {
    console.log('A user connected.');

    // Handle user joining with name
    socket.on('join', (name) => {
        socket.username = name;
        socket.broadcast.emit('user-joined', `${name} joined the chat.`);
    });

    // Handle chat messages
    socket.on('message', (msg) => {
        const timestamp = new Date().toLocaleTimeString();
        io.emit('message', { user: socket.username, msg, timestamp });
    });

    // Handle user disconnect
    socket.on('disconnect', () => {
        console.log('A user disconnected.');
        io.emit('user-left', `${socket.username} left the chat.`);
    });
});

// Start server
const PORT = 3100;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
