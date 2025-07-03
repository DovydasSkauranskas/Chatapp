
let socket;

function connectToSocket() {
    if(socket) return;

    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = '/login.html';
        return;
    }
    socket = io();
    socket.on('connection', socket => {
        console.log(`User with id ${socket.id} connected`);
    });

    socket.on('message', message => {
        console.log(`Incoming message: ${message}`);
    });
}

async function fetchMessages() {
    try {
        const res = await fetch('/api/messages');
        const dataObject = await res.json();
        if(!dataObject.success) {
            throw new Error('Error fetching messages');
        }
        const messages = dataObject.data;
        const chatBox = document.getElementById('chatBox');

        messages.reverse().forEach(({ user, message }) => {
            const messageElement = document.createElement('div');
            messageElement.textContent = `${user}: ${message}`;
            chatBox.appendChild(messageElement);
        });
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchMessages();
    connectToSocket();

    const inputField = document.getElementById('msgInput');
    const messageButton = document.getElementById('submit');
    messageButton.addEventListener('click', () => {
        const message = inputField.value;
        socket.emit('message', { username: localStorage.getItem('username'), message });
        inputField.value = '';
    });

    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            messageButton.click();
        }
    });

    socket.on('message', (messageObject) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `${messageObject.user}: ${messageObject.message}`;
        chatBox.appendChild(messageElement);
    });
});