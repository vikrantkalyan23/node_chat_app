const socket = io();

const usernameInput = document.getElementById('username');
const joinBtn = document.getElementById('join-btn');
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message');
const messagesDiv = document.getElementById('messages');

joinBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username) {
        socket.emit('join', username);
        chatBox.classList.remove('hidden');
        usernameInput.style.display = 'none';
        joinBtn.style.display = 'none';
    }
});

messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const msg = messageInput.value.trim();
        if (msg) {
            socket.emit('message', msg);
            messageInput.value = '';
        }
    }
});

socket.on('message', ({ user, msg, timestamp }) => {
    const msgDiv = document.createElement('div');
    msgDiv.textContent = `${timestamp} ${user}: ${msg}`;
    messagesDiv.appendChild(msgDiv);
});

socket.on('user-joined', (msg) => {
    const joinMsg = document.createElement('div');
    joinMsg.textContent = msg;
    messagesDiv.appendChild(joinMsg);
});

socket.on('user-left', (msg) => {
    const leaveMsg = document.createElement('div');
    leaveMsg.textContent = msg;
    messagesDiv.appendChild(leaveMsg);
});
