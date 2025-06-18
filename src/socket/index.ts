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
        console.log(`Connected from backend: ${socket.id}`);
        socket.on('message', async (message: string) => {
            await redis.lpush('messages', JSON.stringify({user: socket.id, message: message}));
            console.log('Pushing to redis');
            socket.emit('message', message);
        });
    });
}
