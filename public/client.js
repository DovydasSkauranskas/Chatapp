
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

    socket.on('message', (messageObject) => {
        addMessagesToChatBox(messageObject.user, messageObject.message, messageObject.user === username);
    });
}

function addMessagesToChatBox(user, message, isCurrentUser) {
    const chatBox = document.getElementById('chatBox');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isCurrentUser ? 'user': 'other');
    messageElement.textContent = `${isCurrentUser ? 'You' : user}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function fetchMessages() {
    try {
        const res = await fetch('/api/messages');
        const dataObject = await res.json();
        if(!dataObject.success) {
            throw new Error('Error fetching messages');
        }
        const messages = dataObject.data;

        const username = localStorage.getItem('username');
        messages.reverse().forEach(({ user, message }) => {
            addMessagesToChatBox(user, message, user === username);
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
});