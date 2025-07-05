import { Socket } from "socket.io";
import { getRedis } from "../config/redis";
const express = require('express');
const app = express();
const { Server, } = require('socket.io');
const cors = require('cors');
require('dotenv').config();
app.use(cors());

const redis = getRedis();

export function socketSetup(io: typeof Server) {
    io.on('connection', (socket: Socket) => {
        socket.on('message', async ({ username, message }: { username: string; message: string }) => {
            await redis.lpush('messages', JSON.stringify({user: username, message: message}));
            io.emit('message', { user: username, message: message });
        });
    });
}
