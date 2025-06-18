const http = require('http');
import { Server } from 'socket.io';
import app from './app';
import { socketSetup } from './socket/index';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server);
socketSetup(io); 

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
