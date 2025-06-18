
let socket;

function connectToSocket() {
    if(socket) return;
    socket = io();
    socket.on('connection', socket => {
        console.log(`User with id ${socket.id} connected`);
    });

    socket.on('message', message => {
        console.log(`Incoming message: ${message}`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    connectToSocket();

    const inputField = document.getElementById('msgInput');
    const messageButton = document.getElementById('submit');
    messageButton.addEventListener('click', () => {
        const message = inputField.value;
        socket.emit('message', message);
        inputField.value = '';
    });

    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            messageButton.click();
        }
    });
});